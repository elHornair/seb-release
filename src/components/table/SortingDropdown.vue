<template>
  <Menu as="div" class="menu">
    <MenuButton class="menu__toggle">
      <span class="sr-only">Open {{ label }} sorting options</span>
      <span aria-hidden="true">
        <component :is="currentIcon" class="menu__toggle__icon" />
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
      <MenuItems
        class="menu__items"
        :class="{ 'menu__items--right': openRight }"
      >
        <div class="menu__section">
          <MenuItem v-slot="{ active }">
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              :aria-label="`Sort by ${label} A to Z`"
              @click="setSorting(fieldName, SORT_DIRECTION.DSC)"
            >
              <span aria-hidden="true">
                <SortDescendingIcon
                  class="menu__item__icon"
                ></SortDescendingIcon>
              </span>
              <span class="menu__item__label">Sort A to Z</span>
              <span
                v-if="currentSorting === SORT_DIRECTION.DSC"
                aria-hidden="true"
              >
                <CheckCircleIcon
                  class="menu__item__icon menu__item__icon--right"
                ></CheckCircleIcon>
              </span>
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              :aria-label="`Sort by ${label} Z to A`"
              @click="setSorting(fieldName, SORT_DIRECTION.ASC)"
            >
              <span aria-hidden="true">
                <SortAscendingIcon class="menu__item__icon"></SortAscendingIcon>
              </span>
              <span class="menu__item__label">Sort Z to A</span>
              <span
                v-if="currentSorting === SORT_DIRECTION.ASC"
                aria-hidden="true"
              >
                <CheckCircleIcon
                  class="menu__item__icon menu__item__icon--right"
                ></CheckCircleIcon>
              </span>
            </button>
          </MenuItem>
        </div>
        <div v-if="currentSorting" class="menu__section">
          <MenuItem v-slot="{ active }">
            <button
              class="menu__item"
              :class="{ 'menu__item--active': active }"
              @click="removeSorting()"
            >
              <span aria-hidden="true">
                <XCircleIcon class="menu__item__icon"></XCircleIcon>
              </span>
              <span class="menu__item__label">Remove Sorting</span>
            </button>
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
  CheckCircleIcon,
} from "@heroicons/vue/solid";
import { useSorting } from "@/composables/useSorting";
import { computed } from "vue";

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
    CheckCircleIcon,
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    openRight: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { sortingState, setSorting, removeSorting, SORT_DIRECTION } =
      useSorting();

    const sortDirectionToIcon = {
      [SORT_DIRECTION.DSC]: "SortDescendingIcon",
      [SORT_DIRECTION.ASC]: "SortAscendingIcon",
    };

    const currentSorting = computed(() =>
      sortingState.field === props.fieldName ? sortingState.direction : null
    );

    const currentIcon = computed(() => {
      if (currentSorting.value && sortingState.direction) {
        return sortDirectionToIcon[sortingState.direction];
      }

      return "SwitchVerticalIcon";
    });

    return {
      sortingState,
      SORT_DIRECTION,
      currentSorting,
      currentIcon,
      setSorting,
      removeSorting,
    };
  },
};
</script>
