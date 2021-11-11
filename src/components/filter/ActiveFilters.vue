<template>
  <div
    v-if="hasActiveFilters"
    class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6 mb-6"
  >
    <h2>Active Filters</h2>
    <div class="flex space-x-4 divide-x divide-gray-200 text-sm mt-2">
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
            class="ml-2 my-1"
          ></active-filter>
        </div>

        <div>
          <button class="button" @click="showFilters">Adapt filters</button>
          <button class="button" @click="removeAllFilters">
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

<style lang="scss" scoped>
.button {
  @apply text-gray-900;
  @apply border-b;
  @apply border-gray-600;
  @apply mt-2;
  @apply ml-2;
  @apply hover:text-indigo-800;
  @apply hover:border-indigo-700;
}
</style>
