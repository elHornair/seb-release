<template>
  <th
    scope="col"
    class="table_head_field"
    :class="{ 'bg-yellow-100': currentSorting }"
    :aria-sort="currentSortingAria"
  >
    <div class="flex items-end">
      <span class="pr-1">
        {{ label }}
      </span>
      <button
        type="button"
        class="table_head_field__button"
        :class="{
          'table_head_field__button--active':
            currentSorting === SORT_DIRECTION.ASC,
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
        class="table_head_field__button"
        :class="{
          'table_head_field__button--active':
            currentSorting === SORT_DIRECTION.DSC,
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
    </div>
  </th>
</template>

<script>
import { SortDescendingIcon } from "@heroicons/vue/solid";
import { SortAscendingIcon } from "@heroicons/vue/solid";
import { useSorting } from "@/composables/useSorting";

export default {
  name: "TableHeadField",
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
    currentSortingAria() {
      if (this.currentSorting === this.SORT_DIRECTION.ASC) {
        return "ascending";
      }
      if (this.currentSorting === this.SORT_DIRECTION.DSC) {
        return "descending";
      }

      return "none";
    },
  },
};
</script>

<style lang="scss" scoped>
.table_head_field {
  @apply relative;
  @apply px-6;
  @apply py-3;
  @apply text-left text-xs;
  @apply font-medium;
  @apply text-gray-500;
  @apply uppercase;
  @apply tracking-wider;
}

.table_head_field__button {
  @apply -mb-1;

  &.table_head_field__button--active {
    @apply text-gray-900;
  }
}
</style>
