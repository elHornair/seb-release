<template>
  <Menu as="div" class="menu">
    <MenuButton class="menu__toggle">
      <span class="sr-only">Open {{ label }} sorting options</span>
      <span aria-hidden="true">
        <component :is="currentIcon" class="menu__toggle__icon" />
      </span>
    </MenuButton>

    <DropdownTransition>
      <MenuItems
        class="menu__content"
        :class="{ 'menu__content--right': openRight }"
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
    </DropdownTransition>
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
import { useInstitutionSorting } from "@/composables/institution/useInstitutionSorting";
import { computed } from "vue";
import DropdownTransition from "@/components/misc/DropdownTransition";

export default {
  name: "SortingDropdown",
  components: {
    DropdownTransition,
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
      useInstitutionSorting();

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
