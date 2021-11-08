<template>
  <div>
    <h3 class="title">Sorting</h3>
    <label for="sorting" class="sr-only">Sorting</label>
    <div class="mt-1">
      <select
        id="sorting"
        v-model="currentSorting"
        name="sorting"
        autocomplete="off"
        class="select"
      >
        <template v-for="field in fields" :key="field.field">
          <option :value="createSortingValue(field.field, SORT_DIRECTION.DSC)">
            By {{ field.label }} A to Z
          </option>
          <option :value="createSortingValue(field.field, SORT_DIRECTION.ASC)">
            By {{ field.label }} Z to A
          </option>
        </template>
        <option :value="NO_SORTING">No Sorting</option>
      </select>
    </div>
  </div>
</template>

<script>
import { useSorting } from "@/composables/useSorting";

export default {
  name: "GeneralSortingDropdown",
  props: {
    fields: {
      type: Array,
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
    NO_SORTING() {
      return "NO_SORTING";
    },
    currentSorting: {
      get() {
        return this.sortingState.field
          ? this.createSortingValue(
              this.sortingState.field,
              this.sortingState.direction
            )
          : this.NO_SORTING;
      },
      set(newValue) {
        if (newValue === this.NO_SORTING) {
          this.removeSorting();
        } else {
          const splitValues = newValue.split("_");
          this.setSorting(splitValues[0], splitValues[1]);
        }
      },
    },
  },
  methods: {
    createSortingValue(field, direction) {
      return `${field}_${direction}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  @apply block;
  @apply text-sm;
  @apply font-medium;
  @apply text-gray-700;
}
.select {
  @apply block;
  @apply w-full;
  @apply border-gray-300;
  @apply rounded-md;
  @apply shadow-sm;

  @apply sm:w-auto;
  @apply sm:text-sm;

  @apply xl:w-full;
}
</style>
