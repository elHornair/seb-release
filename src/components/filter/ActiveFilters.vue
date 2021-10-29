<template>
  <div
    v-if="hasActiveFilters"
    class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 mb-6"
  >
    <h2>Active Filters</h2>
    <div class="flex space-x-4 divide-x divide-gray-200 text-sm mt-2">
      <span class="flex mt-3 text-gray-700 font-medium whitespace-nowrap">
        <span aria-hidden="true">
          <FilterIcon
            class="h-5 w-5 mr-2 text-gray-400 mr-2"
          ></FilterIcon> </span
        >{{ activeFiltersLabel }}
      </span>
      <div class="pl-2">
        <active-filter
          v-for="activeFilter in activeFilters"
          :key="activeFilter.field"
          :field="activeFilter.field"
          :value="activeFilter.value"
          class="ml-2 my-1"
        ></active-filter>

        <action-button
          label="Remove all"
          :primary="false"
          type="button"
          class="ml-2 my-1"
          @click="removeAllFilters()"
        >
          <template #icon>
            <XCircleIcon class="-ml-1 mr-2 h-5 w-5 text-gray-700"></XCircleIcon>
          </template>
        </action-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useFiltering } from "@/composables/useFiltering";
import { computed } from "vue";
import { FilterIcon, XCircleIcon } from "@heroicons/vue/solid";
import ActionButton from "@/components/misc/ActionButton";
import ActiveFilter from "@/components/filter/ActiveFilter";

export default {
  name: "ActiveFilters",
  components: {
    ActiveFilter,
    ActionButton,
    FilterIcon,
    XCircleIcon,
  },
  setup() {
    const { filteringState, removeAllFilters } = useFiltering();

    const activeFilters = computed(() => {
      return Object.keys(filteringState)
        .filter((key) => filteringState[key] !== null)
        .map((key) => {
          return { field: key, value: filteringState[key] };
        });
    });

    const activeFiltersAmount = computed(() => activeFilters.value.length);
    const hasActiveFilters = computed(() => activeFiltersAmount.value > 0);

    const activeFiltersLabel = computed(
      () =>
        `${activeFiltersAmount.value} Filter${
          activeFiltersAmount.value > 1 ? "s" : ""
        }`
    );

    return {
      activeFilters,
      hasActiveFilters,
      activeFiltersLabel,
      removeAllFilters,
    };
  },
};
</script>
