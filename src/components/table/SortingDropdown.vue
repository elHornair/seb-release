<template>
  <Menu as="div" class="relative inline-block text-left z-10 font-normal">
    <MenuButton class="flex items-center hover:text-indigo-700">
      <span class="sr-only">Open {{ label }} sorting options</span>
      <span aria-hidden="true">
        <component :is="currentIcon" class="h-5 w-5" />
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
      <MenuItems class="items" :class="{ 'items--right': openRight }">
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <button
              class="item"
              :class="{
                'bg-gray-100 text-gray-900': active,
              }"
              :aria-label="`Sort by ${label} A to Z`"
              @click="setSorting(fieldName, SORT_DIRECTION.DSC)"
            >
              <span aria-hidden="true">
                <SortDescendingIcon class="item__icon"></SortDescendingIcon>
              </span>
              <span class="flex-grow text-left">Sort A to Z</span>
              <span
                v-if="currentSorting === SORT_DIRECTION.DSC"
                aria-hidden="true"
              >
                <CheckCircleIcon
                  class="item__icon item__icon--right"
                ></CheckCircleIcon>
              </span>
            </button>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <button
              class="item"
              :class="{
                'bg-gray-100 text-gray-900': active,
              }"
              :aria-label="`Sort by ${label} Z to A`"
              @click="setSorting(fieldName, SORT_DIRECTION.ASC)"
            >
              <span aria-hidden="true">
                <SortAscendingIcon class="item__icon"></SortAscendingIcon>
              </span>
              <span class="flex-grow text-left">Sort Z to A</span>
              <span
                v-if="currentSorting === SORT_DIRECTION.ASC"
                aria-hidden="true"
              >
                <CheckCircleIcon
                  class="item__icon item__icon--right"
                ></CheckCircleIcon>
              </span>
            </button>
          </MenuItem>
        </div>
        <div v-if="currentSorting" class="py-1">
          <MenuItem v-slot="{ active }">
            <button
              class="item"
              :class="{ 'bg-gray-100 text-gray-900': active }"
              @click="removeSorting()"
            >
              <span aria-hidden="true">
                <XCircleIcon class="item__icon"></XCircleIcon>
              </span>
              <span class="flex-grow text-left">Remove Sorting</span>
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
      if (sortingState.direction) {
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

<style lang="scss" scoped>
.items {
  @apply origin-top-right;
  @apply absolute;
  @apply right-0;
  @apply mt-2;
  @apply w-56;
  @apply rounded-md;
  @apply shadow-lg;
  @apply bg-white;
  @apply ring-1 ring-black ring-opacity-5;
  @apply divide-y divide-gray-100;

  &.items--right {
    @apply origin-top-left;
    @apply right-auto;
    @apply left-0;
  }
}

.item {
  @apply group;
  @apply flex;
  @apply items-center;
  @apply justify-between;
  @apply w-full;
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

  &.item__icon--right {
    @apply mr-0;
  }
}
</style>
