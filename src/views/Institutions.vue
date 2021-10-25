<template>
  <view-split label-aside="General actions concerning all institutions">
    <template #main>
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
                    <table-head-field
                      v-for="sortableField in sortableFields"
                      :key="sortableField.field"
                      :field-name="sortableField.field"
                      :label="sortableField.label"
                      :use-dropdown="sortableField.useDropdown"
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
                      class="table_cell w-2/12"
                      :class="{
                        'bg-yellow-50': sortingState.field === 'active',
                      }"
                    >
                      <status-batch :active="institution.active"></status-batch>
                    </td>
                    <td class="table_cell w-2/12" role="cell">
                      <span class="flex space-x-2">
                        <router-link
                          class="inline-action"
                          :to="{
                            name: 'institution-view',
                            params: { id: institution.id },
                          }"
                        >
                          <span class="sr-only">View</span>
                          <span aria-hidden="true">
                            <search-icon class="h-5 w-5"></search-icon>
                          </span>
                        </router-link>
                        <router-link
                          class="inline-action"
                          :to="{
                            name: 'institution-edit',
                            params: { id: institution.id },
                          }"
                        >
                          <span class="sr-only">Edit</span>
                          <span aria-hidden="true">
                            <pencil-alt-icon class="h-5 w-5"></pencil-alt-icon>
                          </span>
                        </router-link>
                        <toggle-institution-status-action
                          :id="institution.id"
                          class="inline-action"
                          :active="institution.active"
                          @institution:change="updateInstitutionData"
                        ></toggle-institution-status-action>
                      </span>
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
            "
            :fields="sortableFields"
          ></GeneralSortingDropdown>
          <action-button
            v-if="showAddAction"
            label="Add institution"
            type="link"
            :route-obj="{ name: 'institution-create' }"
          >
            <template #icon>
              <plus-circle-icon class="-ml-1 mr-2 h-5 w-5 text-white" />
            </template>
          </action-button>
        </div>
      </div>
    </template>
  </view-split>
</template>

<script>
import { reactive, watch } from "vue";
import { useAPI } from "@/composables/useAPI";
import { useSorting } from "@/composables/useSorting";
import { useAccessControl } from "@/composables/useAccessControl";
import { PencilAltIcon } from "@heroicons/vue/solid";
import { SearchIcon } from "@heroicons/vue/solid";
import { PlusCircleIcon } from "@heroicons/vue/solid";
import Pagination from "@/components/misc/Pagination";
import TableHeadField from "@/components/table/TableHeadField";
import ViewSplit from "@/components/layout/ViewSplit";
import ActionButton from "@/components/misc/ActionButton";
import StatusBatch from "@/components/misc/StatusBatch";
import GeneralSortingDropdown from "@/components/table/GeneralSortingDropdown";
import ToggleInstitutionStatusAction from "@/components/institution/ToggleInstitutionStatusAction";

export default {
  name: "Institution",
  components: {
    ToggleInstitutionStatusAction,
    GeneralSortingDropdown,
    ActionButton,
    ViewSplit,
    TableHeadField,
    Pagination,
    StatusBatch,
    PlusCircleIcon,
    PencilAltIcon,
    SearchIcon,
  },
  setup() {
    const { readInstitutions } = useAPI();
    const { sortingState, sortingApiParam, SORT_DIRECTION } = useSorting();
    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();

    const institutionsState = reactive({
      institutions: [],
      totalPages: 0,
      currentPage: 0,
    });

    const updateInstitutionData = async () => {
      const institutionData = await readInstitutions({
        sort: sortingApiParam.value,
      });

      Object.assign(institutionsState, {
        institutions: institutionData["content"],
        totalPages: institutionData["number_of_pages"],
        currentPage: institutionData["page_number"],
      });
    };

    watch(sortingApiParam, () => updateInstitutionData());

    updateInstitutionData();

    return {
      sortingState,
      SORT_DIRECTION,
      institutionsState,
      availablePrivileges,
      availableActions,
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
          useDropdown: false,
        },
        {
          field: "urlSuffix",
          label: "URL Suffix",
          useDropdown: true,
        },
        {
          field: "active",
          label: "Status",
          useDropdown: true,
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

      if (this.sortingState.field) {
        currentSortingInfo = `Currently sorted by ${this.sortingState.field} ${
          this.sortingState.direction === this.SORT_DIRECTION.ASC
            ? "Z to A"
            : "A to Z"
        }`;
      } else {
        currentSortingInfo = "Currently not sorted";
      }

      return `List of institutions. ${currentSortingInfo}. Use buttons in column header to adapt sorting.`;
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

.inline-action {
  @apply font-medium;
  @apply text-gray-500;
  @apply hover:text-indigo-700;
}
</style>
