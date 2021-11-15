<template>
  <div v-if="hasActiveFilters" class="panel mb-6">
    <h2>Active Filters</h2>
    <div class="flex space-x-3 divide-x divide-gray-200 text-sm mt-1">
      <span class="flex mt-3 text-gray-700 font-medium whitespace-nowrap">
        <span aria-hidden="true">
          <FilterIcon class="h-5 w-5 mr-2 text-gray-400"></FilterIcon> </span
        >{{ activeFiltersLabel }}
      </span>
      <div class="pl-2">
        <div>
          <active-filter
            v-for="activeFilter in activeFilters"
            :key="activeFilter.field"
            :field="activeFilter.field"
            :value="activeFilter.value"
            class="mr-1 my-1"
          ></active-filter>
        </div>

        <div class="mt-1">
          <button class="link mr-2" @click="showFilters">Adapt filters</button>
          <button class="link" @click="removeAllFilters">
            Remove all <span class="sr-only">filters</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";
import { FilterIcon } from "@heroicons/vue/solid";
import ActiveFilter from "@/components/filter/ActiveFilter";

export default {
  name: "ActiveFilters",
  components: {
    ActiveFilter,
    FilterIcon,
  },
  setup() {
    const {
      showFilters,
      removeAllFilters,
      activeFilters,
      hasActiveFilters,
      activeFiltersLabel,
    } = useInstitutionFiltering();

    return {
      showFilters,
      removeAllFilters,
      activeFilters,
      hasActiveFilters,
      activeFiltersLabel,
    };
  },
};
</script>
