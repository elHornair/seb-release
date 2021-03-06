<template>
  <!-- https://www.w3.org/TR/wai-aria-practices/#menu -->
  <nav
    id="main-navigation"
    ref="root"
    aria-label="Main"
    class="z-20 relative"
    :aria-hidden="isAriaHidden"
  >
    <button
      ref="closeButtonRef"
      class="flex items-center mx-0 mt-2 px-6 md:hidden"
      type="button"
      @click="setIsOpen(false)"
    >
      Close Navigation
    </button>

    <div class="flex items-center justify-start mt-10 px-6">
      <dl class="pr-2">
        <dt class="sr-only">Logged in as</dt>
        <dd>{{ userName }}</dd>
      </dl>
      <router-link class="link" :to="{ name: 'logout' }">Sign out</router-link>
    </div>

    <ul class="mt-10">
      <li class="mb-4">
        <main-navigation-header
          ><span>SEB Server Administration</span></main-navigation-header
        >
        <ul>
          <main-navigation-item
            v-if="showInstitutionNavItem"
            route="institutions"
          />
          <main-navigation-item v-if="showUserNavItem" route="user-account" />
          <main-navigation-item v-if="showUserLogNavItem" route="user-logs" />
        </ul>
      </li>
    </ul>

    <ul class="mt-10">
      <li>
        <main-navigation-header><span>Links</span></main-navigation-header>
        <ul>
          <main-navigation-item-external href="https://www.safeexambrowser.org/"
            >Documentation</main-navigation-item-external
          >
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useAccessControl } from "@/composables/useAccessControl";
import { useSidebar } from "@/composables/useSidebar";
import { useAuth } from "@/composables/useAuth";
import MainNavigationHeader from "@/components/main-navigation/MainNavigationHeader.vue";
import MainNavigationItem from "@/components/main-navigation/MainNavigationItem.vue";
import MainNavigationItemExternal from "@/components/main-navigation/MainNavigationItemExternal.vue";

export default {
  name: "MainNavigation",
  components: {
    MainNavigationItem,
    MainNavigationHeader,
    MainNavigationItemExternal,
  },
  props: {
    isAriaHidden: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const { setIsOpen } = useSidebar();
    const {
      availablePrivileges,
      availableActions,
      hasBasePrivilege,
      hasInstitutionalPrivilege,
    } = useAccessControl();
    const { userName } = useAuth();

    const closeButtonRef = ref();

    return {
      setIsOpen,
      closeButtonRef,
      availablePrivileges,
      availableActions,
      hasBasePrivilege,
      hasInstitutionalPrivilege,
      userName,
    };
  },
  computed: {
    showInstitutionNavItem() {
      return (
        this.hasBasePrivilege(
          this.availablePrivileges.INSTITUTION,
          this.availableActions.READ
        ) ||
        this.hasInstitutionalPrivilege(
          this.availablePrivileges.INSTITUTION,
          this.availableActions.READ
        )
      );
    },
    showUserNavItem() {
      return (
        this.hasBasePrivilege(
          this.availablePrivileges.USER,
          this.availableActions.READ
        ) ||
        this.hasInstitutionalPrivilege(
          this.availablePrivileges.USER,
          this.availableActions.READ
        )
      );
    },
    showUserLogNavItem() {
      return (
        this.hasBasePrivilege(
          this.availablePrivileges.USER_ACTIVITY_LOG,
          this.availableActions.READ
        ) ||
        this.hasInstitutionalPrivilege(
          this.availablePrivileges.USER_ACTIVITY_LOG,
          this.availableActions.READ
        )
      );
    },
  },
};
</script>
