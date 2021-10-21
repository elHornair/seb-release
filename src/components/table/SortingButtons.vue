<template>
  <span class="flex items-end -mb-1">
    <button
      type="button"
      class="sorting-button"
      :class="{
        'sorting-button--active': currentSorting === SORT_DIRECTION.ASC,
      }"
      @click="
        currentSorting === SORT_DIRECTION.ASC
          ? removeSorting()
          : setSorting(fieldName, SORT_DIRECTION.ASC)
      "
    >
      <span class="sr-only">Sort by {{ label }} ascending</span>
      <span aria-hidden="true">
        <sort-ascending-icon class="h-5 w-5"></sort-ascending-icon>
      </span>
    </button>
    <button
      type="button"
      class="sorting-button"
      :class="{
        'sorting-button--active': currentSorting === SORT_DIRECTION.DSC,
      }"
      @click="
        currentSorting === SORT_DIRECTION.DSC
          ? removeSorting()
          : setSorting(fieldName, SORT_DIRECTION.DSC)
      "
    >
      <span class="sr-only">Sort by {{ label }} descending</span>
      <span aria-hidden="true">
        <sort-descending-icon class="h-5 w-5"></sort-descending-icon>
      </span>
    </button>
  </span>
</template>

<script>
import { SortDescendingIcon } from "@heroicons/vue/solid";
import { SortAscendingIcon } from "@heroicons/vue/solid";
import { useSorting } from "@/composables/useSorting";

export default {
  name: "SortingButtons",
  components: {
    SortDescendingIcon,
    SortAscendingIcon,
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
  },
  setup() {
    const { sortingState, setSorting, removeSorting, SORT_DIRECTION } =
      useSorting();

    return {
      sortingState,
      setSorting,
      removeSorting,
      SORT_DIRECTION,
    };
  },
  computed: {
    currentSorting() {
      return this.sortingState.field === this.fieldName
        ? this.sortingState.direction
        : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.sorting-button {
  @apply hover:text-indigo-700;

  &.sorting-button--active {
    @apply text-indigo-700;
  }
}
</style>
