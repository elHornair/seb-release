<template>
  <Menu as="div" class="relative inline-block text-left z-10 font-normal">
    <div>
      <MenuButton class="flex items-center hover:text-indigo-700">
        <span class="sr-only">Open sorting options</span>
        <span aria-hidden="true">
          <SwitchVerticalIcon class="h-5 w-5" />
        </span>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="
          origin-top-right
          absolute
          right-0
          mt-2
          w-56
          rounded-md
          shadow-lg
          bg-white
          ring-1 ring-black ring-opacity-5
          divide-y divide-gray-100
          focus:outline-none
        "
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
              href="#"
              class="item"
              :class="{ 'bg-gray-100 text-gray-900': active }"
            >
              <span aria-hidden="true">
                <SortDescendingIcon class="item__icon"></SortDescendingIcon>
              </span>
              Sort A to Z</a
            >
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <a
              href="#"
              class="item"
              :class="{ 'bg-gray-100 text-gray-900': active }"
            >
              <span aria-hidden="true">
                <SortAscendingIcon class="item__icon"></SortAscendingIcon>
              </span>
              Sort Z to A</a
            >
          </MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <a
              href="#"
              class="item"
              :class="{ 'bg-gray-100 text-gray-900': active }"
            >
              <span aria-hidden="true">
                <XCircleIcon class="item__icon"></XCircleIcon>
              </span>
              Remove Sorting</a
            >
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  SwitchVerticalIcon,
  SortDescendingIcon,
  SortAscendingIcon,
  XCircleIcon,
} from "@heroicons/vue/solid";

export default {
  name: "SortingDropdown",
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    SwitchVerticalIcon,
    SortDescendingIcon,
    SortAscendingIcon,
    XCircleIcon,
  },
};
</script>

<style lang="scss" scoped>
.item {
  @apply group;
  @apply flex;
  @apply items-center;
  @apply px-4;
  @apply py-2;
  @apply text-sm;
  @apply text-gray-700;
}

.item__icon {
  @apply mr-3;
  @apply h-5;
  @apply w-5;
  @apply text-gray-400;
  @apply group-hover:text-gray-500;
}
</style>
