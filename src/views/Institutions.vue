<template>
  <view-split label-aside="Actions">
    <template #main>
      <ActiveFilters class="hidden sm:block"></ActiveFilters>
      <div
        class="flex flex-col"
        role="region"
        aria-describedby="table_description"
        aria-labelledby="table_caption"
        tabindex="0"
      >
        <div
          class="overflow-x-auto shadow border-b border-gray-200 sm:rounded-lg"
        >
          <div
            class="
              relative
              z-0
              align-middle
              inline-block
              min-w-full
              overflow-hidden
            "
          >
            <p id="table_description" class="sr-only">{{ tableDescription }}</p>

            <MultiselectControls
              v-if="isMultiselect"
              class="absolute z-10 top-2 left-4 sm:top-3.5 sm:left-6"
            ></MultiselectControls>

            <table class="block sm:table min-w-full divide-y divide-gray-200">
              <caption
                id="table_caption"
                :class="{
                  table_caption: true,
                  'table_caption--multiselect': isMultiselect,
                }"
              >
                {{
                  tableCaption
                }}
              </caption>
              <thead class="hidden sm:table-header-group bg-gray-50">
                <tr class="hidden sm:table-row">
                  <th
                    v-if="isMultiselect"
                    scope="col"
                    class="table_head_cell table_head_cell--selection"
                  >
                    <span class="sr-only">Selection</span>
                  </th>

                  <table-head-field
                    v-for="(field, index) in fields"
                    :key="field.name"
                    :field-name="field.name"
                    :label="field.label"
                    :first-col="index === 0"
                  ></table-head-field>

                  <th scope="col" class="table_head_cell">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="block sm:table-row-group">
                <tr
                  v-for="(institution, institutionIndex) in displayableItems"
                  :key="institution.id"
                  class="table_row"
                  :class="{
                    'table_row--multiselect': isMultiselect,
                    'bg-white': institutionIndex % 2 === 0,
                    'bg-gray-50': institutionIndex % 2 !== 0,
                  }"
                >
                  <td
                    v-if="isMultiselect"
                    class="table_cell table_cell--break-out-left"
                    style="width: 7rem; min-width: 7rem"
                  >
                    <input
                      :id="`select_cb_${institution.id}`"
                      :name="`select_cb_${institution.id}`"
                      :checked="multiselect.isSelected(institution.id)"
                      type="checkbox"
                      class="table__checkbox"
                      @change="
                        multiselect.isSelected(institution.id)
                          ? multiselect.removeSelected(institution.id)
                          : multiselect.addSelected(institution.id)
                      "
                    />
                    <label :for="`select_cb_${institution.id}`" class="sr-only"
                      >Select this institution</label
                    >
                  </td>
                  <TableContentField
                    v-for="field in fields"
                    :key="`${institutionIndex}_${field.name}`"
                    class="table_cell"
                    :label="field.label"
                    :field-name="field.name"
                    :is-header="field.isMain"
                  >
                    <template v-if="field.renderContentAs">
                      <component
                        :is="field.renderContentAs"
                        :value="institution[field.name]"
                      ></component>
                    </template>
                    <template v-else>
                      {{ institution[field.name] }}
                    </template>
                  </TableContentField>
                  <td
                    class="
                      table_cell table_cell--break-out-right
                      sm:w-1/12 sm:text-right
                    "
                  >
                    <InlineActionsDropdown
                      :institution="institution"
                      @institution:change="updateInstitutionData"
                    ></InlineActionsDropdown>
                  </td>
                </tr>
              </tbody>
            </table>
            <pagination
              :current-page="paging.currentPage.value"
              :total-pages="paging.totalPages.value"
            ></pagination>
          </div>
        </div>
      </div>
    </template>
    <template #aside>
      <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 class="mb-3">Actions</h2>
        <div
          class="
            flex flex-col-reverse
            gap-4
            sm:flex-row sm:items-end sm:justify-between
            xl:flex-col xl:items-start
          "
        >
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
            <FiltersSummary class="block sm:hidden"></FiltersSummary>
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
  </view-split>
</template>

<script>
import { computed } from "vue";
import { useAccessControl } from "@/composables/useAccessControl";
import { PlusCircleIcon } from "@heroicons/vue/solid";
import { FilterIcon } from "@heroicons/vue/solid";
import { DocumentRemoveIcon } from "@heroicons/vue/solid";
import Pagination from "@/components/misc/Pagination";
import TableHeadField from "@/components/table/TableHeadField";
import ViewSplit from "@/components/layout/ViewSplit";
import ActionButton from "@/components/misc/ActionButton";
import StatusBatch from "@/components/misc/StatusBatch";
import GeneralSortingDropdown from "@/components/table/GeneralSortingDropdown";
import Filters from "@/components/filter/Filters";
import ActiveFilters from "@/components/filter/ActiveFilters";
import InlineActionsDropdown from "@/components/table/InlineActionsDropdown";
import TableContentField from "@/components/table/TableContentField";
import MultiselectControls from "@/components/table/MultiselectControls";
import { useInstitutions } from "@/composables/institution/useInstitutions";
import FiltersSummary from "@/components/filter/FiltersSummary";
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";

export default {
  name: "Institution",
  components: {
    FiltersSummary,
    MultiselectControls,
    TableContentField,
    InlineActionsDropdown,
    ActiveFilters,
    Filters,
    GeneralSortingDropdown,
    ActionButton,
    ViewSplit,
    TableHeadField,
    Pagination,
    StatusBatch,
    PlusCircleIcon,
    FilterIcon,
    DocumentRemoveIcon,
  },
  setup() {
    const {
      displayableItems,
      updateInstitutionData,
      tableCaption,
      tableDescription,
      isMultiselect,
      multiselect,
      paging,
    } = useInstitutions();
    const { hasActiveFilters, filtersVisible, showFilters, hideFilters } =
      useInstitutionFiltering();
    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();

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

    updateInstitutionData();

    return {
      displayableItems,
      isMultiselect,
      multiselect,
      paging,
      showBulkActions,
      tableCaption,
      tableDescription,
      hasActiveFilters,
      filtersVisible,
      showAddAction,
      handleBulkActionClick,
      showFilters,
      hideFilters,
      updateInstitutionData,
      fields: [
        {
          name: "name",
          label: "Name",
          isMain: true,
        },
        {
          name: "urlSuffix",
          label: "URL Suffix",
          isMain: false,
        },
        {
          name: "active",
          label: "Status",
          isMain: false,
          renderContentAs: "StatusBatch",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.table_caption {
  @apply block;
  @apply relative;
  @apply px-4;
  @apply py-3;
  @apply text-gray-500;
  @apply text-left;
  @apply text-xs;
  @apply font-medium;
  @apply uppercase;
  @apply tracking-wider;
  @apply bg-gray-50;

  @apply sm:table-caption;
  @apply sm:sr-only;

  &.table_caption--multiselect {
    @apply pl-20;
    @apply text-right;
  }
}

.table_head_cell {
  @apply relative;
  @apply px-6;
  @apply py-3;

  &.table_head_cell--selection {
    width: 7rem;
    min-width: 7rem;
  }
}

.table_row {
  @apply block;
  @apply relative;
  @apply pl-2;
  @apply pr-8;
  @apply py-3;
  @apply sm:table-row;
  @apply sm:pl-0;
  @apply sm:pr-0;
  @apply sm:py-0;

  &.table_row--multiselect {
    @apply pl-10;
    @apply sm:pl-0;
  }
}

.table_cell {
  @apply flex;
  @apply relative;
  @apply px-2;
  @apply py-2;
  @apply font-normal;
  @apply text-sm;
  @apply text-left;
  @apply align-top;
  @apply text-gray-500;
  @apply sm:table-cell;
  @apply sm:px-6;
  @apply sm:py-4;

  &.table_cell--break-out-left {
    @apply absolute;
    @apply top-3.5;
    @apply left-2;
    @apply sm:relative;
    @apply sm:top-auto;
    @apply sm:left-auto;
    @apply sm:px-6;
  }

  &.table_cell--break-out-right {
    @apply absolute;
    @apply top-3;
    @apply right-0;
    @apply sm:relative;
    @apply sm:top-auto;
    @apply sm:right-auto;
    @apply sm:px-6;
  }
}

.table__checkbox {
  @apply h-4;
  @apply w-4;
  @apply text-indigo-600;
  @apply border-gray-300;
  @apply rounded;
}
</style>
