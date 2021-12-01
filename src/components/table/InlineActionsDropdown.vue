<template>
  <Menu as="div" class="menu">
    <MenuButton ref="menuButtonRef" class="menu__toggle">
      <span class="sr-only"
        >Actions for institution "{{ institution.name }}"</span
      >
      <span aria-hidden="true">
        <DotsVerticalIcon class="menu__toggle__icon" />
      </span>
    </MenuButton>

    <DropdownTransition>
      <MenuItems
        class="menu__content"
        :class="{ 'menu__content--top': openTop }"
      >
        <div class="menu__section">
          <MenuItem v-slot="{ active }">
            <router-link
              :to="{
                name: 'institution-view',
                params: { id: institution.id },
              }"
              class="menu__item"
              :class="{ 'menu__item--active': active }"
            >
              <span aria-hidden="true">
                <SearchIcon class="menu__item__icon"></SearchIcon>
              </span>
              <span class="menu__item__label">View</span>
            </router-link>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <router-link
              :to="{
                name: 'institution-edit',
                params: { id: institution.id },
              }"
              class="menu__item"
              :class="{ 'menu__item--active': active }"
            >
              <span aria-hidden="true">
                <PencilAltIcon class="menu__item__icon"></PencilAltIcon>
              </span>
              <span class="menu__item__label">Edit</span>
            </router-link>
          </MenuItem>
          <MenuItem v-if="!institution.active" v-slot="{ active }">
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="handleActivateClick"
            >
              <span aria-hidden="true">
                <StatusOnlineIcon class="menu__item__icon"></StatusOnlineIcon>
              </span>
              <span class="menu__item__label">Activate</span>
            </button>
          </MenuItem>
          <MenuItem v-if="institution.active" v-slot="{ active }">
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="handleDeactivateClick"
            >
              <span aria-hidden="true">
                <StatusOfflineIcon class="menu__item__icon"></StatusOfflineIcon>
              </span>
              <span class="menu__item__label">Deactivate</span>
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
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  DotsVerticalIcon,
  SearchIcon,
  PencilAltIcon,
  StatusOfflineIcon,
  StatusOnlineIcon,
  XCircleIcon,
} from "@heroicons/vue/solid";
import { useInstitutionStatusToggling } from "@/composables/institution/useInstitutionStatusToggling";
import DropdownTransition from "@/components/misc/DropdownTransition";
import { ref } from "vue";

export default {
  name: "InlineActionsDropdown",
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
    SearchIcon,
    PencilAltIcon,
    StatusOfflineIcon,
    StatusOnlineIcon,
    XCircleIcon,
    DropdownTransition,
  },
  props: {
    institution: {
      type: Object,
      required: true,
    },
    openTop: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["institution:change"],
  setup(props, context) {
    const { handleActivateRequest, handleDeactivateRequest } =
      useInstitutionStatusToggling();

    const menuButtonRef = ref(null);

    const handleActivateClick = async () => {
      if (await handleActivateRequest(props.institution.id)) {
        context.emit("institution:change", {
          id: props.institution.id,
        });
      }
    };

    const handleDeactivateClick = async () => {
      if (await handleDeactivateRequest(props.institution.id)) {
        context.emit("institution:change", {
          id: props.institution.id,
        });
      }
    };

    const handleCloseClick = () => {
      menuButtonRef.value.el.click();
    };

    return {
      handleActivateClick,
      handleDeactivateClick,
      handleCloseClick,
      menuButtonRef,
    };
  },
};
</script>
