import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useAccessControl } from "@/composables/useAccessControl";

import Institutions from "@/views/Institutions.vue";
import Login from "@/views/Login.vue";
import Dummy from "@/views/Dummy.vue";
import NotFound from "@/views/NotFound.vue";

const { isAuthenticated, invalidateUser } = useAuth();
const {
  grantAccessToCurrentRoute,
  denyAccessToCurrentRoute,
  availablePrivileges,
  availableActions,
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
    path: "/institutions",
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

router.beforeEach(async (to) => {
  if (!to.meta.accessControl.public && !isAuthenticated.value) {
    return "login";
  }

  if (to.name === "login" && isAuthenticated.value) {
    return "home";
  }

  if (to.name === "logout") {
    invalidateUser();
    return "login";
  }

  if (to.name === "home") {
    return "user-account";
  }

  if (
    to.meta.accessControl.privilege &&
    to.meta.accessControl.action &&
    !hasInstitutionalPrivilege(
      to.meta.accessControl.privilege,
      to.meta.accessControl.action
    )
  ) {
    denyAccessToCurrentRoute();
  } else {
    grantAccessToCurrentRoute();
  }
});

export const getDisplayNameByRouteName = (routeName) =>
  ({
    institutions: "Institutions",
    "user-account": "User Account",
    "user-logs": "User Logs",
    "not-found": "Page not found",
  }[routeName] || "");

export default router;
