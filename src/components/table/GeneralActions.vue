<template>
  <div class="mt-2 float-right sm:hidden">
    <Menu as="div" class="menu">
      <MenuButton class="menu__toggle">
        <span class="sr-only">Select general institution action</span>
        <span aria-hidden="true">
          <DotsVerticalIcon class="menu__toggle__icon" />
        </span>
      </MenuButton>

      <DropdownTransition>
        <MenuItems class="menu__content">
          <div class="menu__section">
            <MenuItem v-if="showAddAction" v-slot="{ active }">
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
          </div>
        </MenuItems>
      </DropdownTransition>
    </Menu>
  </div>
  <div class="hidden sm:block">
    <action-button
      v-if="showAddAction"
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
import DropdownTransition from "@/components/misc/DropdownTransition";
import ActionButton from "@/components/misc/ActionButton";
import { computed } from "vue";
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
    DropdownTransition,
    ActionButton,
  },
  setup() {
    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();
    const { multiselect } = useInstitutions();

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

    return {
      showAddAction,
      showBulkActions,
      handleBulkActionClick,
    };
  },
};
</script>
