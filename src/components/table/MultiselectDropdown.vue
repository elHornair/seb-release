<template>
  <Menu as="div" class="menu">
    <MenuButton class="menu__toggle">
      <span class="sr-only">Open multiselect actions</span>
      <span aria-hidden="true">
        <DotsVerticalIcon class="menu__toggle__icon" />
      </span>
    </MenuButton>
    <DropdownTransition>
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
            v-if="multiselect.selectedCount.value > 0"
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
                  multiselect.selectedCount.value
                }})</span
              >
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </DropdownTransition>
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
import DropdownTransition from "@/components/misc/DropdownTransition";

export default {
  name: "MultiselectDropdown",
  components: {
    DropdownTransition,
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
