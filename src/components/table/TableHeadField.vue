<template>
  <th
    scope="col"
    class="table_head_field"
    :class="{ 'bg-yellow-100': isSorted }"
    :aria-sort="currentSortingAria"
  >
    <div class="flex items-end">
      <span class="table_head_field__text">
        {{ label }}
      </span>
      <sorting-dropdown v-if="useDropdown"></sorting-dropdown>
      <sorting-buttons
        v-else
        class="flex items-end -mb-1"
        :label="label"
        :field-name="fieldName"
      ></sorting-buttons>
    </div>
  </th>
</template>

<script>
import SortingButtons from "@/components/table/SortingButtons";
import { useSorting } from "@/composables/useSorting";
import SortingDropdown from "@/components/table/SortingDropdown";

export default {
  name: "TableHeadField",
  components: {
    SortingDropdown,
    SortingButtons,
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
    useDropdown: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const { sortingState, SORT_DIRECTION } = useSorting();

    return {
      sortingState,
      SORT_DIRECTION,
    };
  },
  computed: {
    isSorted() {
      return this.sortingState.field === this.fieldName;
    },
    currentSortingAria() {
      if (this.isSorted) {
        return this.sortingState.direction === this.SORT_DIRECTION.ASC
          ? "ascending"
          : "descending";
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
  @apply text-gray-500;
}

.table_head_field__text {
  @apply pr-1;
  @apply text-left text-xs;
  @apply font-medium;
  @apply uppercase;
  @apply tracking-wider;
}
</style>
