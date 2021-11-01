<template>
  <Menu as="div" class="menu">
    <MenuButton class="menu__toggle">
      <span class="sr-only">Open actions for this institution</span>
      <span aria-hidden="true">
        <DotsVerticalIcon class="menu__toggle__icon" />
      </span>
    </MenuButton>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems class="menu__content">
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
          <!-- TODO: add status toggle action here -->
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  DotsVerticalIcon,
  SearchIcon,
  PencilAltIcon,
} from "@heroicons/vue/solid";

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
  },
  props: {
    institution: {
      type: Object,
      required: true,
    },
  },
};
</script>
