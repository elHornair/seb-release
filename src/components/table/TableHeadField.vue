<template>
  <th
    role="columnheader"
    scope="col"
    class="table_head_field"
    :class="{ 'bg-yellow-100': isSorted }"
    :aria-sort="currentSortingAria"
    :aria-label="label"
  >
    <div class="flex items-end">
      <span class="table_head_field__text">
        {{ label }}
      </span>
      <SortingDropdown
        :label="label"
        :field-name="fieldName"
        :open-right="firstCol"
        :aria-hidden="true"
        class="hidden sm:block"
      ></SortingDropdown>
    </div>
  </th>
</template>

<script>
import { useSorting } from "@/composables/useSorting";
import SortingDropdown from "@/components/table/SortingDropdown";
import { computed } from "vue";

export default {
  name: "TableHeadField",
  components: {
    SortingDropdown,
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
    firstCol: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { sortingState, SORT_DIRECTION } = useSorting();
    const isSorted = computed(() => sortingState.field === props.fieldName);
    const currentSortingAria = computed(() => {
      if (isSorted.value) {
        return sortingState.direction === SORT_DIRECTION.ASC
          ? "ascending"
          : "descending";
      }

      return "none";
    });

    return {
      sortingState,
      isSorted,
      currentSortingAria,
      SORT_DIRECTION,
    };
  },
};
</script>

<style lang="scss" scoped>
.table_head_field {
  @apply relative;
  @apply px-6;
  @apply py-3;
  @apply text-gray-500;
  @apply whitespace-nowrap;
}

.table_head_field__text {
  @apply pr-1;
  @apply text-left;
  @apply text-xs;
  @apply font-medium;
  @apply uppercase;
  @apply tracking-wider;
}
</style>
