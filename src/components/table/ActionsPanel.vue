<template>
  <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
    <h2 class="mb-3">Actions</h2>
    <div class="flex flex-col-reverse gap-4">
      <GeneralSortingDropdown
        class="
          pt-4
          border-t border-gray-200
          sm:border-t-0 sm:pt-0
          xl:pb-4 xl:border-b
          sm:sr-only
        "
        :fields="fields"
      ></GeneralSortingDropdown>

      <div
        class="
          pt-4
          border-t border-gray-200
          sm:border-t-0 sm:pt-0
          xl:pb-4 xl:border-b
          w-full
        "
      >
        <h3 class="text-sm font-medium text-gray-700 pb-1">Filtering</h3>
        <FiltersSummary class="block xl:hidden"></FiltersSummary>
        <action-button
          :label="`${hasActiveFilters ? 'Adapt' : 'Show'} filters`"
          type="button"
          :primary="true"
          :full-xl="true"
          @click="showFilters"
        >
          <template #icon>
            <FilterIcon class="-ml-1 mr-2 h-5 w-5 text-white" />
          </template>
        </action-button>
        <Filters v-if="filtersVisible" @hide="hideFilters"></Filters>
      </div>

      <div class="w-full">
        <h3 class="text-sm font-medium text-gray-700 pb-1">Main Actions</h3>
        <action-button
          v-if="showAddAction"
          label="Add institution"
          type="link"
          :full-xl="true"
          :route-obj="{ name: 'institution-create' }"
        >
          <template #icon>
            <plus-circle-icon class="-ml-1 mr-2 h-5 w-5 text-white" />
          </template>
        </action-button>
      </div>
      <div v-if="showBulkActions" class="w-full">
        <h3 class="text-sm font-medium text-gray-700 pb-1">Bulk Actions</h3>
        <action-button
          label="Delete Selected"
          type="button"
          :full-xl="true"
          @click="handleBulkActionClick"
        >
          <template #icon>
            <DocumentRemoveIcon class="-ml-1 mr-2 h-5 w-5 text-white" />
          </template>
        </action-button>
      </div>
    </div>
  </div>
</template>

<script>
import Filters from "@/components/filter/Filters";

import FiltersSummary from "@/components/filter/FiltersSummary";
import GeneralSortingDropdown from "@/components/table/GeneralSortingDropdown";
import ActionButton from "@/components/misc/ActionButton";
import { PlusCircleIcon } from "@heroicons/vue/solid";
import { FilterIcon } from "@heroicons/vue/solid";
import { DocumentRemoveIcon } from "@heroicons/vue/solid";
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
    PlusCircleIcon,
    FilterIcon,
    DocumentRemoveIcon,
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
