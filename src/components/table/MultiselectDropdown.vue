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
            v-if="!multiselect.areAllVisibleSelected.value"
            v-slot="{ active }"
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
            v-if="multiselect.selectedAndVisibleCount.value > 0"
            v-slot="{ active }"
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
                  multiselect.selectedAndVisibleCount.value
                }})
              </span>
            </button>
          </MenuItem>
          <MenuItem
            v-if="multiselect.selectedCount.value > 0"
            v-slot="{ active }"
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
                >Deselect selected <span class="sr-only">institutions</span> ({{
                  multiselect.selectedCount.value
                }})</span
              >
            </button>
          </MenuItem>
        </div>
        <div class="menu__section">
          <MenuItem v-slot="{ active }">
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="
                multiselect.keepSelectedOnTop.value =
                  !multiselect.keepSelectedOnTop.value
              "
            >
              <span aria-hidden="true">
                <StarIcon class="menu__item__icon"></StarIcon>
              </span>
              <span class="menu__item__label"
                ><span class="sr-only">Keep</span> Selected
                <span class="sr-only">institutions</span> on top
              </span>
              <span
                v-if="multiselect.keepSelectedOnTop.value"
                aria-hidden="true"
              >
                <CheckIcon
                  class="menu__item__icon menu__item__icon--right"
                ></CheckIcon>
              </span>
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
  StarIcon,
  CheckIcon,
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
    StarIcon,
    CheckIcon,
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
