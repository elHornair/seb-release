<template>
  <div class="layout">
    <SkipLinks />
    <Header />
    <Sidebar />

    <div class="layout__content">
      <router-view v-if="accessToCurrentRouteGranted" />
      <main v-else id="main-content">
        <h1 class="layout__mainheading">
          {{ routeDisplayName }}
        </h1>
        <alert
          title="Error 403 – Access denied"
          message="You don't have the required permissions to access this page."
        ></alert>
      </main>
    </div>
  </div>
</template>

<script>
import Header from "../header/Header.vue";
import Sidebar from "./Sidebar.vue";
import SkipLinks from "../SkipLinks.vue";
import { getDisplayNameByRouteName } from "@/router";
import { useAccessControl } from "@/composables/useAccessControl";
import Alert from "@/components/misc/Alert";

export default {
  name: "LayoutMain",
  components: { Alert, Sidebar, Header, SkipLinks },
  setup() {
    const { accessToCurrentRouteGranted } = useAccessControl();

    return {
      accessToCurrentRouteGranted,
    };
  },
  computed: {
    routeDisplayName() {
      return getDisplayNameByRouteName(this.$route.name);
    },
  },
};
</script>
