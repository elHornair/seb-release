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
          <MenuItem
            v-slot="{ active }"
            :disabled="multiselect.areAllVisibleSelected.value"
          >
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="multiselect.selectAllVisible()"
            >
              <span aria-hidden="true">
                <CheckCircleIcon class="menu__item__icon"></CheckCircleIcon>
              </span>
              <span class="menu__item__label"
                >Select visible <span class="sr-only">institutions</span> ({{
                  visibleItemsCount
                }})
              </span>
            </button>
          </MenuItem>
          <MenuItem
            v-slot="{ active }"
            :disabled="multiselect.selectedAndVisibleCount.value <= 0"
          >
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="multiselect.deselectAllVisible()"
            >
              <span aria-hidden="true">
                <XCircleIcon class="menu__item__icon"></XCircleIcon>
              </span>
              <span class="menu__item__label"
                >Deselect visible <span class="sr-only">institutions</span> ({{
                  visibleItemsCount
                }})
              </span>
            </button>
          </MenuItem>
          <MenuItem
            v-slot="{ active }"
            :disabled="multiselect.selectedCount.value <= 0"
          >
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="multiselect.deselectAll()"
            >
              <span aria-hidden="true">
                <XCircleIcon class="menu__item__icon"></XCircleIcon>
              </span>
              <span class="menu__item__label"
                >Reset selection
                <span class="sr-only">of institutions</span></span
              >
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
    const { multiselect, visibleItemsCount } = useInstitutions();

    return {
      multiselect,
      visibleItemsCount,
    };
  },
};
</script>
