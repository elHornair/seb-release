<template>
  <Menu as="div" class="menu">
    <MenuButton class="menu__toggle mt-2">
      <span class="sr-only">Open multiselect actions</span>
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
      <MenuItems class="menu__content menu__content--right">
        <div class="menu__section">
          <MenuItem v-slot="{ active }">
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="handleSelectAllClick"
            >
              <span aria-hidden="true">
                <CheckCircleIcon class="menu__item__icon"></CheckCircleIcon>
              </span>
              <span class="menu__item__label"
                >Select all visible ({{ visibleItemsCount }})</span
              >
            </button>
          </MenuItem>
          <MenuItem v-if="selectedItemsCount > 0" v-slot="{ active }">
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="handleDeselectAllClick"
            >
              <span aria-hidden="true">
                <XCircleIcon class="menu__item__icon"></XCircleIcon>
              </span>
              <span class="menu__item__label"
                >Deselect all selected ({{ selectedItemsCount }})</span
              >
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { computed } from "vue";
import { useMultiselect } from "@/composables/useMultiselect";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  DotsVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/solid";

export default {
  name: "MultiselectDropdown",
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    DotsVerticalIcon,
    CheckCircleIcon,
    XCircleIcon,
  },
  setup() {
    const { multiSelectionState, selectAllVisible, unselectAll } =
      useMultiselect();

    const visibleItemsCount = computed(() => {
      return Object.values(multiSelectionState).length; // TODO: refactor this. The value is not always correct, because not all items in the multiSelectionState are visible
    });

    const selectedItemsCount = computed(
      () =>
        Object.values(multiSelectionState).filter((item) => item.checked).length
    );

    const handleSelectAllClick = () => {
      selectAllVisible();
    };
    const handleDeselectAllClick = () => {
      unselectAll();
    };

    return {
      visibleItemsCount,
      selectedItemsCount,
      handleSelectAllClick,
      handleDeselectAllClick,
    };
  },
};
</script>
