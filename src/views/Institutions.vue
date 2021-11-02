<template>
  <view-split label-aside="Actions">
    <template #main>
      <ActiveFilters></ActiveFilters>

      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div
            class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          >
            <div
              class="
                shadow
                overflow-hidden
                border-b border-gray-200
                sm:rounded-lg
              "
            >
              <table class="min-w-full divide-y divide-gray-200" role="table">
                <caption class="sr-only">
                  {{
                    caption
                  }}
                </caption>
                <thead class="bg-gray-50" role="rowgroup">
                  <tr role="row">
                    <th
                      v-if="multiselect"
                      scope="col"
                      class="relative px-6 py-3"
                    >
                      <span class="sr-only">Selection</span>
                    </th>

                    <table-head-field
                      v-for="(sortableField, index) in sortableFields"
                      :key="sortableField.field"
                      :field-name="sortableField.field"
                      :label="sortableField.label"
                      :use-dropdown="sortableField.useDropdown"
                      :first-col="index === 0"
                    ></table-head-field>

                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  <tr
                    v-for="(
                      institution, institutionIndex
                    ) in institutionsState.institutions"
                    :key="institution.id"
                    role="row"
                    :class="
                      institutionIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    "
                  >
                    <td
                      v-if="multiselect"
                      class="table_cell w-1/12"
                      role="cell"
                    >
                      <input
                        :id="`cb_${institution.id}`"
                        v-model="selectionState[institution.id].checked"
                        :name="`cb_${institution.id}`"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label :for="`cb_${institution.id}`" class="sr-only">{{
                        institution.name
                      }}</label>
                    </td>
                    <td
                      role="cell"
                      class="table_cell table_cell--bold w-4/12"
                      :class="{ 'bg-yellow-50': sortingState.field === 'name' }"
                    >
                      {{ institution.name }}
                    </td>
                    <td
                      role="cell"
                      class="table_cell w-4/12"
                      :class="{
                        'bg-yellow-50': sortingState.field === 'urlSuffix',
                      }"
                    >
                      {{ institution.urlSuffix }}
                    </td>
                    <td
                      role="cell"
                      class="table_cell"
                      :class="{
                        'bg-yellow-50': sortingState.field === 'active',
                        'w-2/12': multiselect,
                        'w-3/12': !multiselect,
                      }"
                    >
                      <status-batch :active="institution.active"></status-batch>
                    </td>
                    <td class="table_cell w-1/12 text-right" role="cell">
                      <InlineActionsDropdown
                        :institution="institution"
                        @institution:change="updateInstitutionData"
                      ></InlineActionsDropdown>
                    </td>
                  </tr>
                </tbody>
              </table>
              <pagination
                :current-page="institutionsState.currentPage"
                :total-pages="institutionsState.totalPages"
              ></pagination>
            </div>
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
            :fields="sortableFields"
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
              label="Bulk action"
              type="button"
              class="mt-2 xl:ml-0"
              :full-xl="true"
              @click="handleBulkActionClick"
            >
              <template #icon>
                <ViewListIcon class="-ml-1 mr-2 h-5 w-5 text-white" />
              </template>
            </action-button>
          </div>
        </div>
      </div>
    </template>
  </view-split>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useAPI } from "@/composables/useAPI";
import { useSorting } from "@/composables/useSorting";
import { useFiltering } from "@/composables/useFiltering";
import { useMultiselect } from "@/composables/useMultiselect";
import { useAccessControl } from "@/composables/useAccessControl";
import { PlusCircleIcon } from "@heroicons/vue/solid";
import { FilterIcon } from "@heroicons/vue/solid";
import { ViewListIcon } from "@heroicons/vue/solid";
import Pagination from "@/components/misc/Pagination";
import TableHeadField from "@/components/table/TableHeadField";
import ViewSplit from "@/components/layout/ViewSplit";
import ActionButton from "@/components/misc/ActionButton";
import StatusBatch from "@/components/misc/StatusBatch";
import GeneralSortingDropdown from "@/components/table/GeneralSortingDropdown";
import Filters from "@/components/filter/Filters";
import ActiveFilters from "@/components/filter/ActiveFilters";
import InlineActionsDropdown from "@/components/table/InlineActionsDropdown";

export default {
  name: "Institution",
  components: {
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
    ViewListIcon,
  },
  props: {
    multiselect: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { readInstitutions } = useAPI();
    const { selectionState, selectedCounter, addOptions, unselectAll } =
      useMultiselect();
    const { sortingState, sortingApiParam, SORT_DIRECTION } = useSorting();
    const { filteringState, filteringApiParam } = useFiltering();
    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();

    const filtersVisible = ref(false);
    const handleFilterShow = () => (filtersVisible.value = true);
    const handleFilterHide = () => (filtersVisible.value = false);

    const institutionsState = reactive({
      institutions: [],
      totalPages: 0,
      currentPage: 0,
    });

    const showBulkActions = computed(
      () => props.multiselect && selectedCounter.value > 0
    );

    const handleBulkActionClick = () => {
      alert(`Do something with ${selectedCounter.value} selected item(s)`);
    };

    const updateInstitutionData = async () => {
      const institutionData = await readInstitutions(
        {
          sort: sortingApiParam.value,
        },
        filteringApiParam.value
      );

      Object.assign(institutionsState, {
        institutions: institutionData["content"],
        totalPages: institutionData["number_of_pages"],
        currentPage: institutionData["page_number"],
      });
    };

    watch(sortingApiParam, () => updateInstitutionData());
    watch(filteringApiParam, async () => {
      await updateInstitutionData();

      if (props.multiselect) {
        unselectAll();
      }
    });

    watch(institutionsState, () => {
      if (props.multiselect) {
        addOptions(
          institutionsState.institutions.map((institution) => institution.id)
        );
      }
    });

    updateInstitutionData();

    return {
      filtersVisible,
      sortingState,
      SORT_DIRECTION,
      filteringState,
      institutionsState,
      selectionState,
      availablePrivileges,
      availableActions,
      showBulkActions,
      handleBulkActionClick,
      handleFilterShow,
      handleFilterHide,
      hasBasePrivilege,
      updateInstitutionData,
    };
  },
  data() {
    return {
      sortableFields: [
        {
          field: "name",
          label: "Name",
        },
        {
          field: "urlSuffix",
          label: "URL Suffix",
        },
        {
          field: "active",
          label: "Status",
        },
      ],
    };
  },
  computed: {
    showAddAction() {
      return this.hasBasePrivilege(
        this.availablePrivileges.INSTITUTION,
        this.availableActions.WRITE
      );
    },
    caption() {
      let currentSortingInfo;
      let currentFilteringInfo = Object.keys(this.filteringState)
        .filter((fieldKey) => this.filteringState[fieldKey] !== null)
        .join(", ");

      if (currentFilteringInfo) {
        currentFilteringInfo = `Currently filtered by ${currentFilteringInfo}`;
      } else {
        currentFilteringInfo = "Currently not filtered";
      }

      if (this.sortingState.field) {
        currentSortingInfo = `Currently sorted by ${this.sortingState.field} ${
          this.sortingState.direction === this.SORT_DIRECTION.ASC
            ? "Z to A"
            : "A to Z"
        }`;
      } else {
        currentSortingInfo = "Currently not sorted";
      }

      return `List of institutions. ${currentFilteringInfo}. ${currentSortingInfo}. Go to actions landmark to adapt filtering and sorting.`;
    },
  },
};
</script>

<style lang="scss" scoped>
.table_cell {
  @apply relative;
  @apply px-6;
  @apply py-4;
  @apply whitespace-nowrap;
  @apply text-sm;
  @apply text-gray-500;

  &.table_cell--bold {
    @apply font-medium;
    @apply text-gray-900;
  }
}
</style>
