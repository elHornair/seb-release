<template>
  <div class="panel">
    <h2 class="sr-only sm:not-sr-only sm:mb-2">Controls</h2>
    <div class="flex flex-col gap-2">
      <section class="section section--actions">
        <h3 class="title title--extra-spaced">
          <span class="hidden sm:block">Actions</span>
        </h3>

        <div class="content">
          <GeneralActions></GeneralActions>
        </div>
      </section>

      <section
        class="section"
        :class="{ 'section--xl-only': hasActiveFilters }"
      >
        <h3 class="title title--extra-spaced">Filter</h3>
        <div class="content">
          <action-button
            :label="`${hasActiveFilters ? 'Adapt' : 'Show'} filters`"
            type="button"
            :primary="true"
            :full-xl="true"
            @click="showFilters"
          >
          </action-button>
        </div>
      </section>

      <section v-if="hasActiveFilters" class="section section--active-filters">
        <span class="title">
          <span class="sr-only">Active filters</span>
          {{ activeFiltersLabel }}
        </span>
        <div class="content">
          <FiltersSummary></FiltersSummary>
        </div>
      </section>

      <Filters v-if="filtersVisible" @hide="hideFilters"></Filters>

      <section class="section section--sorting">
        <h3 class="title title--extra-spaced">Sort</h3>
        <div class="content">
          <GeneralSortingDropdown :fields="fields"></GeneralSortingDropdown>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";
import Filters from "@/components/filter/Filters";
import FiltersSummary from "@/components/filter/FiltersSummary";
import GeneralSortingDropdown from "@/components/table/GeneralSortingDropdown";
import ActionButton from "@/components/misc/ActionButton";
import GeneralActions from "@/components/table/GeneralActions";

export default {
  name: "ActionsPanel",
  components: {
    GeneralActions,
    FiltersSummary,
    Filters,
    GeneralSortingDropdown,
    ActionButton,
  },
  props: {
    fields: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const {
      filtersVisible,
      hasActiveFilters,
      activeFiltersLabel,
      showFilters,
      hideFilters,
    } = useInstitutionFiltering();

    return {
      filtersVisible,
      hasActiveFilters,
      activeFiltersLabel,
      showFilters,
      hideFilters,
    };
  },
};
</script>

<style scoped lang="scss">
.section {
  @apply grid;
  @apply grid-cols-12;
  @apply gap-2;
  @apply items-start;
  @apply w-full;

  @apply xl:block;
  @apply xl:pt-2;
  @apply xl:border-t;
  @apply xl:border-gray-200;

  &.section--xl-only {
    @apply hidden;
    @apply xl:block;
  }

  &.section--actions {
    @apply fixed;
    @apply w-auto;
    @apply top-0.5;
    @apply right-0.5;
    @apply z-10;

    @apply sm:relative;
    @apply sm:w-full;
    @apply sm:z-0;
  }

  &.section--sorting {
    @apply sm:sr-only;
  }

  &.section--active-filters {
    @apply xl:hidden;
  }

  &:first-child {
    @apply pt-0;
    @apply border-t-0;
    @apply xl:pt-0;
    @apply xl:border-t-0;
  }
}

.title {
  @apply relative;
  @apply text-sm;
  @apply font-medium;
  @apply text-gray-700;

  @apply col-span-3;
  @apply sm:col-span-2;
  @apply xl:mb-1;

  &.title--extra-spaced {
    @apply mt-2;
    @apply xl:mt-0;
  }
}

.content {
  @apply col-span-9;
  @apply lg:col-span-10;
}
</style>
