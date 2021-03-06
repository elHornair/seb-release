<template>
  <div>
    <label for="sorting" class="sr-only">Sorting</label>
    <select
      id="sorting"
      v-model="currentSorting"
      name="sorting"
      autocomplete="off"
      class="select"
    >
      <template v-for="field in fields" :key="field.name">
        <option :value="createSortingValue(field.name, SORT_DIRECTION.DSC)">
          By {{ field.label }} A to Z
        </option>
        <option :value="createSortingValue(field.name, SORT_DIRECTION.ASC)">
          By {{ field.label }} Z to A
        </option>
      </template>
      <option :value="NO_SORTING">No Sorting</option>
    </select>
  </div>
</template>

<script>
import { useInstitutionSorting } from "@/composables/institution/useInstitutionSorting";

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
      useInstitutionSorting();

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
.select {
  @apply block;
  @apply w-full;
  @apply px-2;
  @apply py-1.5;
  @apply border-gray-300;
  @apply rounded-sm;
  @apply focus:border-primary-600;
  box-shadow: none !important; // needed to be more specific than tailwinds form defaults

  @apply sm:w-auto;
  @apply sm:text-sm;

  @apply xl:w-full;
}
</style>
