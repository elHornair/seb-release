<template>
  <view-split>
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
              <table class="min-w-full divide-y divide-gray-200">
                <caption class="sr-only">
                  List of institutions, use buttons in column header to sort
                </caption>
                <thead class="bg-gray-50">
                  <tr>
                    <table-head-field
                      field-name="name"
                      label="Name"
                    ></table-head-field>
                    <table-head-field
                      field-name="urlSuffix"
                      label="URL Suffix"
                    ></table-head-field>
                    <table-head-field
                      field-name="active"
                      label="Status"
                    ></table-head-field>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(
                      institution, institutionIndex
                    ) in institutionState.institutions"
                    :key="institution.id"
                    :class="
                      institutionIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    "
                  >
                    <td
                      class="table_cell table_cell--bold"
                      :class="{ 'bg-yellow-50': sortingState.field === 'name' }"
                    >
                      {{ institution.name }}
                    </td>
                    <td
                      class="table_cell"
                      :class="{
                        'bg-yellow-50': sortingState.field === 'urlSuffix',
                      }"
                    >
                      {{ institution.urlSuffix }}
                    </td>
                    <td
                      class="table_cell"
                      :class="{
                        'bg-yellow-50': sortingState.field === 'active',
                      }"
                    >
                      <span
                        class="batch"
                        :class="{
                          'bg-green-100 text-green-800': institution.active,
                          'bg-red-100 text-red-800': !institution.active,
                        }"
                      >
                        {{ activeBoolToString(institution.active) }}
                      </span>
                    </td>
                    <td class="table_cell">
                      <span class="flex space-x-2">
                        <a
                          href="#"
                          class="
                            font-medium
                            text-indigo-600
                            hover:text-indigo-900
                          "
                        >
                          <span class="sr-only">View</span>
                          <span aria-hidden="true">
                            <search-icon class="h-5 w-5"></search-icon>
                          </span>
                        </a>
                        <router-link
                          class="
                            font-medium
                            text-indigo-600
                            hover:text-indigo-900
                          "
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

                        <a
                          href="#"
                          class="
                            font-medium
                            text-indigo-600
                            hover:text-indigo-900
                          "
                        >
                          <span class="sr-only">Activate / Deactivate</span>
                          <span aria-hidden="true">
                            <refresh-icon class="h-5 w-5"></refresh-icon>
                          </span>
                        </a>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <pagination
                :current-page="institutionState.currentPage"
                :total-pages="institutionState.totalPages"
              ></pagination>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #aside>
      <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 class="mb-3">Actions</h2>
        <action-button
          v-if="showAddAction"
          label="Add institution"
          type="link"
          route="institution-create"
        >
          <template #icon>
            <plus-circle-icon
              class="-ml-1 mr-2 h-5 w-5 text-white"
              aria-hidden="true"
            />
          </template>
        </action-button>
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
import { RefreshIcon } from "@heroicons/vue/solid";
import { SearchIcon } from "@heroicons/vue/solid";
import { PlusCircleIcon } from "@heroicons/vue/solid";
import Pagination from "@/components/misc/Pagination";
import TableHeadField from "@/components/table/TableHeadField";
import ViewSplit from "@/components/layout/ViewSplit";
import ActionButton from "@/components/misc/ActionButton";

export default {
  name: "Institution",
  components: {
    ActionButton,
    ViewSplit,
    TableHeadField,
    Pagination,
    RefreshIcon,
    PlusCircleIcon,
    PencilAltIcon,
    SearchIcon,
  },
  setup() {
    const { getInstitutions } = useAPI();
    const { sortingState, sortingApiParam } = useSorting();
    const { availablePrivileges, availableActions, hasBasePrivilege } =
      useAccessControl();

    const institutionState = reactive({
      institutions: [],
      totalPages: 0,
      currentPage: 0,
    });

    const updateInstitutionData = async () => {
      const institutionData = await getInstitutions({
        sort: sortingApiParam.value,
      });

      Object.assign(institutionState, {
        institutions: institutionData["content"],
        totalPages: institutionData["number_of_pages"],
        currentPage: institutionData["page_number"],
      });
    };

    watch(sortingApiParam, () => updateInstitutionData());

    updateInstitutionData();

    return {
      sortingState,
      institutionState,
      availablePrivileges,
      availableActions,
      hasBasePrivilege,
    };
  },
  computed: {
    showAddAction() {
      return this.hasBasePrivilege(
        this.availablePrivileges.INSTITUTION,
        this.availableActions.WRITE
      );
    },
  },
  methods: {
    activeBoolToString(active) {
      return active ? "Active" : "Inactive";
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

.batch {
  @apply inline-flex;
  @apply items-center;
  @apply px-3;
  @apply py-0.5;
  @apply rounded-full;
  @apply text-sm;
  @apply font-medium;
}
</style>
