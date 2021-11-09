<template>
  <view-split label-aside="Actions">
    <template #main>
      <ActiveFilters></ActiveFilters>

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
          <div class="align-middle inline-block min-w-full overflow-hidden">
            <p id="table_description" class="sr-only">{{ tableDescription }}</p>
            <table class="block sm:table min-w-full divide-y divide-gray-200">
              <caption id="table_caption" class="table_caption">
                {{
                  tableCaption
                }}
              </caption>
              <thead class="hidden sm:table-header-group bg-gray-50">
                <tr class="hidden sm:table-row">
                  <th
                    v-if="isMultiselect"
                    scope="col"
                    class="relative px-6 py-3"
                  >
                    <span class="sr-only">Selection</span>
                    <MultiselectDropdown></MultiselectDropdown>
                  </th>

                  <table-head-field
                    v-for="(field, index) in fields"
                    :key="field.name"
                    :field-name="field.name"
                    :label="field.label"
                    :first-col="index === 0"
                  ></table-head-field>

                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="block sm:table-row-group">
                <tr
                  v-for="(
                    institution, institutionIndex
                  ) in institutionsState.items"
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
                    class="table_cell table_cell--break-out-left sm:w-1/12"
                  >
                    <input
                      :id="`select_cb_${institution.id}`"
                      v-model="multiSelectionState[institution.id].checked"
                      :name="`select_cb_${institution.id}`"
                      type="checkbox"
                      class="table__checkbox"
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
                    :width="field.width"
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
              :current-page="institutionsState.paging.currentPage"
              :total-pages="institutionsState.paging.totalPages"
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
            <action-button
              label="Show Filters"
              type="button"
              :primary="true"
              :full-xl="true"
              @click="handleFilterShow"
            >
              <template #icon>
                <FilterIcon class="-ml-1 mr-2 h-5 w-5 text-white" />
              </template>
            </action-button>
            <Filters v-if="filtersVisible" @hide="handleFilterHide"></Filters>
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
import { computed, ref } from "vue";
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
import MultiselectDropdown from "@/components/table/MultiselectDropdown";
import { useInstitutions } from "@/composables/institution/useInstitutions";

export default {
  name: "Institution",
  components: {
    MultiselectDropdown,
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
      institutionsState,
      updateInstitutionData,
      selectedCounter,
      multiSelectionState,
      isMultiselect,
      tableCaption,
      tableDescription,
    } = useInstitutions();

    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();

    const filtersVisible = ref(false);
    const handleFilterShow = () => (filtersVisible.value = true);
    const handleFilterHide = () => (filtersVisible.value = false);

    const showAddAction = () => {
      return hasBasePrivilege(
        availablePrivileges.INSTITUTION,
        availableActions.WRITE
      );
    };

    const showBulkActions = computed(() => selectedCounter.value > 0);

    const handleBulkActionClick = () => {
      alert(`This will delete ${selectedCounter.value} selected item(s)`);
    };

    updateInstitutionData();

    return {
      filtersVisible,
      institutionsState,
      multiSelectionState,
      showBulkActions,
      isMultiselect,
      tableCaption,
      tableDescription,
      showAddAction,
      handleBulkActionClick,
      handleFilterShow,
      handleFilterHide,
      updateInstitutionData,
      fields: [
        {
          name: "name",
          label: "Name",
          width: "4/12",
          isMain: true,
        },
        {
          name: "urlSuffix",
          label: "URL Suffix",
          width: "4/12",
          isMain: false,
        },
        {
          name: "active",
          label: "Status",
          width: "2/12",
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
  @apply px-6;
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
}

.table_row {
  @apply block;
  @apply relative;
  @apply pr-8;
  @apply py-3;
  @apply sm:table-row;
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
