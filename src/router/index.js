import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useAccessControl } from "@/composables/useAccessControl";

import Institution from "@/views/Institution.vue";
import Login from "@/views/Login.vue";
import Dummy from "@/views/Dummy.vue";

const {
  isAuthenticated,
  invalidateUser,
  availablePrivileges,
  availableActions,
  hasBasePrivilege,
} = useAuth();

const { grantAccessToCurrentRoute, denyAccessToCurrentRoute } =
  useAccessControl();

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
    name: "institution",
    component: Institution,
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
      layout: "full",
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
    return "institution";
  }

  if (
    to.meta.accessControl.privilege &&
    to.meta.accessControl.action &&
    !hasBasePrivilege(
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
    institution: "Institution",
    "user-account": "User Account",
    "user-logs": "User Logs",
    logout: "Logout",
  }[routeName] || "");

export default router;
