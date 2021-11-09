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
              @click="multiselect.selectAllVisible()"
            >
              <span aria-hidden="true">
                <CheckCircleIcon class="menu__item__icon"></CheckCircleIcon>
              </span>
              <span class="menu__item__label"
                >Select all visible ({{ visibleItemsCount }})</span
              >
            </button>
          </MenuItem>
          <MenuItem
            v-if="multiselect.selectedCounter.value > 0"
            v-slot="{ active }"
          >
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="multiselect.unselectAll()"
            >
              <span aria-hidden="true">
                <XCircleIcon class="menu__item__icon"></XCircleIcon>
              </span>
              <span class="menu__item__label"
                >Deselect all selected ({{
                  multiselect.selectedCounter.value
                }})</span
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
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  DotsVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/solid";
import { useInstitutions } from "@/composables/institution/useInstitutions";

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
    const { institutionsState, multiselect } = useInstitutions();
    const visibleItemsCount = computed(() => institutionsState.items.length);

    return {
      visibleItemsCount,
      multiselect,
    };
  },
};
</script>
