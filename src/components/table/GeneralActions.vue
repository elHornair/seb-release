<template>
  <div class="mt-2 float-right sm:hidden">
    <Menu as="div" class="menu">
      <MenuButton ref="menuButtonRef" class="menu__toggle">
        <h3 class="text-sm font-medium text-gray-700">Actions</h3>
        <span aria-hidden="true">
          <DotsVerticalIcon class="menu__toggle__icon" />
        </span>
      </MenuButton>

      <DropdownTransition>
        <MenuItems class="menu__content">
          <div class="menu__section">
            <MenuItem v-slot="{ active }" :disabled="!showAddAction()">
              <router-link
                :to="{
                  name: 'institution-create',
                }"
                class="menu__item"
                :class="{ 'menu__item--active': active }"
              >
                <span class="menu__item__label">Add institution</span>
              </router-link>
            </MenuItem>
            <MenuItem v-slot="{ active }" :disabled="!showBulkActions">
              <button
                class="menu__item"
                :class="{ 'menu__item--active': active }"
                @click="handleBulkActionClick"
              >
                <span class="menu__item__label"
                  >Delete selected
                  <span class="sr-only">institutions</span></span
                >
              </button>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                class="menu__item sr-only"
                :class="{ 'menu__item--active not-sr-only': active }"
                @click="handleCloseClick"
              >
                <span aria-hidden="true">
                  <XCircleIcon class="menu__item__icon"></XCircleIcon>
                </span>
                <span class="menu__item__label">Close Menu</span>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </DropdownTransition>
    </Menu>
  </div>
  <div class="hidden sm:block">
    <action-button
      :disabled="!showAddAction()"
      label="Add institution"
      type="link"
      :full-xl="true"
      :route-obj="{ name: 'institution-create' }"
    >
    </action-button>
    <action-button
      label="Delete Selected"
      class="mt-1 ml-0 sm:mt-0 sm:ml-1 xl:mt-1 xl:ml-0"
      type="button"
      :full-xl="true"
      :disabled="!showBulkActions"
      @click="handleBulkActionClick"
    >
    </action-button>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { DotsVerticalIcon } from "@heroicons/vue/solid";
import { XCircleIcon } from "@heroicons/vue/solid";
import DropdownTransition from "@/components/misc/DropdownTransition";
import ActionButton from "@/components/misc/ActionButton";
import { computed, ref } from "vue";
import { useAccessControl } from "@/composables/useAccessControl";
import { useInstitutions } from "@/composables/institution/useInstitutions";

export default {
  name: "GeneralActions",
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
    XCircleIcon,
    DropdownTransition,
    ActionButton,
  },
  setup() {
    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();
    const { multiselect } = useInstitutions();

    const menuButtonRef = ref(null);

    const showAddAction = () => {
      return hasBasePrivilege(
        availablePrivileges.INSTITUTION,
        availableActions.WRITE
      );
    };

    const showBulkActions = computed(() => multiselect.selectedCount.value > 0);

    const handleBulkActionClick = () => {
      alert(
        `This will delete ${multiselect.selectedCount.value} selected item(s)`
      );
    };

    const handleCloseClick = () => {
      menuButtonRef.value.el.click();
    };

    return {
      showAddAction,
      showBulkActions,
      handleBulkActionClick,
      handleCloseClick,
      menuButtonRef,
    };
  },
};
</script>
