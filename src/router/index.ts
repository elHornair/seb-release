import {
  createRouter,
  createWebHistory,
  NavigationGuardWithThis,
  RouteLocationNormalized,
} from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useAccessControl } from "@/composables/useAccessControl";

import Institutions from "@/views/Institutions.vue";
import Login from "@/views/Login.vue";
import Dummy from "@/views/Dummy.vue";
import NotFound from "@/views/NotFound.vue";
import InstitutionCreate from "@/views/InstitutionCreate.vue";
import InstitutionEdit from "@/views/InstitutionEdit.vue";
import InstitutionView from "@/views/InstitutionView.vue";

const { isAuthenticated, invalidateUser } = useAuth();
const {
  grantAccessToCurrentRoute,
  denyAccessToCurrentRoute,
  availablePrivileges,
  availableActions,
  hasBasePrivilege,
  hasInstitutionalPrivilege,
} = useAccessControl();

const routes = [
  {
    path: "/",
    name: "home",
    component: Dummy,
    meta: {
      accessControl: {
        public: false,
      },
    },
  },
  {
    path: "/institution",
    name: "institutions",
    component: Institutions,
    meta: {
      accessControl: {
        public: false,
        privilege: availablePrivileges.INSTITUTION,
        action: availableActions.READ,
      },
    },
  },
  {
    path: "/institution/:id",
    name: "institution-view",
    component: InstitutionView,
    meta: {
      accessControl: {
        public: false,
        privilege: availablePrivileges.INSTITUTION,
        action: availableActions.READ,
      },
    },
  },
  {
    path: "/institution/create",
    name: "institution-create",
    component: InstitutionCreate,
    meta: {
      accessControl: {
        public: false,
        privilege: availablePrivileges.INSTITUTION,
        action: availableActions.WRITE,
      },
    },
  },
  {
    path: "/institution/:id/edit",
    name: "institution-edit",
    component: InstitutionEdit,
    meta: {
      accessControl: {
        public: false,
        privilege: availablePrivileges.INSTITUTION,
        action: availableActions.MODIFY,
      },
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: Dummy,
    meta: {
      accessControl: {
        public: true,
      },
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      layout: "empty",
      accessControl: {
        public: true,
      },
    },
  },
  {
    path: "/user-account",
    name: "user-account",
    component: Dummy,
    meta: {
      accessControl: {
        public: false,
        privilege: availablePrivileges.USER,
        action: availableActions.READ,
      },
    },
  },
  {
    path: "/user-logs",
    name: "user-logs",
    component: Dummy,
    meta: {
      accessControl: {
        public: false,
        privilege: availablePrivileges.USER_ACTIVITY_LOG,
        action: availableActions.READ,
      },
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: NotFound,
    meta: {
      accessControl: {
        public: true,
      },
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to: any) => {
  // TODO: this shouldn't use "any". Improve and refactor the routing (see https://github.com/AlexBrohshtut/vue-ts-realworld-app/blob/class-api/src/router/index.ts for a good example)

  if (!to.meta.accessControl.public && !isAuthenticated.value) {
    return { name: "login" };
  }

  if (to.name === "login" && isAuthenticated.value) {
    return { name: "home" };
  }

  if (to.name === "logout") {
    await invalidateUser();
    return { name: "login" };
  }

  if (to.name === "home") {
    return "user-account";
  }

  if (
    to.meta.accessControl.privilege &&
    to.meta.accessControl.action &&
    !(
      hasBasePrivilege(
        to.meta.accessControl.privilege,
        to.meta.accessControl.action
      ) ||
      hasInstitutionalPrivilege(
        to.meta.accessControl.privilege,
        to.meta.accessControl.action
      )
    )
  ) {
    denyAccessToCurrentRoute();
  } else {
    grantAccessToCurrentRoute();
  }
});

export const getDisplayNameByRouteName = (routeName: string) => {
  const mapping: {
    [key: string]: string;
  } = {
    institutions: "Institutions",
    "institution-view": "Institution",
    "institution-create": "Add institution",
    "institution-edit": "Edit institution",
    "user-account": "User Account",
    "user-logs": "User Logs",
    "not-found": "Page not found",
  };

  if (Object.keys(mapping).includes(routeName)) {
    return mapping[routeName];
  }

  return "";
};

export default router;
