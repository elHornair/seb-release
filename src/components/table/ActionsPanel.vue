<template>
  <div class="panel">
    <h2 class="sr-only sm:not-sr-only sm:mb-2">Actions</h2>
    <div class="flex flex-col gap-2">
      <section class="section">
        <h3 class="title">Main Actions</h3>
        <div class="content">
          <action-button
            v-if="showAddAction"
            label="Add institution"
            type="link"
            :full-xl="true"
            :route-obj="{ name: 'institution-create' }"
          >
          </action-button>
          <action-button
            label="Delete Selected"
            class="mt-1"
            type="button"
            :full-xl="true"
            :disabled="!showBulkActions"
            @click="handleBulkActionClick"
          >
          </action-button>
        </div>
      </section>

      <section class="section">
        <h3 class="title">Filtering</h3>
        <div class="content">
          <FiltersSummary class="block xl:hidden"></FiltersSummary>
          <action-button
            :label="`${hasActiveFilters ? 'Adapt' : 'Show'} filters`"
            type="button"
            :primary="true"
            :full-xl="true"
            @click="showFilters"
          >
          </action-button>
          <Filters v-if="filtersVisible" @hide="hideFilters"></Filters>
        </div>
      </section>

      <section class="section section--sorting">
        <h3 class="title">Sorting</h3>
        <div class="content">
          <GeneralSortingDropdown :fields="fields"></GeneralSortingDropdown>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/filter/Filters";
import FiltersSummary from "@/components/filter/FiltersSummary";
import GeneralSortingDropdown from "@/components/table/GeneralSortingDropdown";
import ActionButton from "@/components/misc/ActionButton";
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";
import { useAccessControl } from "@/composables/useAccessControl";
import { computed } from "vue";
import { useInstitutions } from "@/composables/institution/useInstitutions";

export default {
  name: "ActionsPanel",
  components: {
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
    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();
    const { multiselect } = useInstitutions();
    const { filtersVisible, hasActiveFilters, showFilters, hideFilters } =
      useInstitutionFiltering();

    const showAddAction = () => {
      return hasBasePrivilege(
        availablePrivileges.INSTITUTION,
        availableActions.WRITE
      );
    };

    const showBulkActions = computed(() => multiselect.selectedCount.value > 0);

    const handleBulkActionClick = () => {
      alert(
        `This will delete ${multiselect.selectedCount.value} selected item(s)`
      );
    };

    return {
      filtersVisible,
      hasActiveFilters,
      showFilters,
      hideFilters,
      showAddAction,
      showBulkActions,
      handleBulkActionClick,
    };
  },
};
</script>

<style scoped lang="scss">
.section {
  @apply pt-2;
  @apply border-t;
  @apply border-gray-200;
  @apply sm:border-t-0;
  @apply sm:pt-0;
  @apply xl:pt-2;
  @apply xl:border-t;
  @apply w-full;

  @apply sm:grid;
  @apply sm:grid-cols-12;
  @apply sm:gap-2;
  @apply sm:items-start;
  @apply xl:block;

  &.section--sorting {
    @apply sm:sr-only;
  }

  &:first-child {
    @apply pt-0;
    @apply border-t-0;
    @apply xl:pt-0;
    @apply xl:border-t-0;
  }
}

.title {
  @apply text-sm;
  @apply font-medium;
  @apply text-gray-700;
  @apply pb-1;

  @apply sm:col-span-2;
  @apply md:col-span-3;
  @apply lg:col-span-2;
}

.content {
  @apply sm:col-span-10;
  @apply md:col-span-9;
  @apply lg:col-span-10;
}
</style>
