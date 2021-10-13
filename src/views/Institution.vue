<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <caption class="sr-only">
              List of institutions
            </caption>
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="table__head">Name</th>
                <th scope="col" class="table__head">URL Suffix</th>
                <th scope="col" class="table__head">Status</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(institution, institutionIndex) in institutions"
                :key="institution.id"
                :class="institutionIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
              >
                <td class="table__data table__data--bold">
                  {{ institution.name }}
                </td>
                <td class="table__data">
                  {{ institution.urlSuffix }}
                </td>
                <td class="table__data">
                  <span v-if="institution.active">
                    <span class="sr-only">Active</span>
                    <span aria-hidden="true">
                      <check-circle-icon
                        class="h-5 w-5 text-green-400"
                      ></check-circle-icon>
                    </span>
                  </span>
                  <span v-else>
                    <span class="sr-only">Inactive</span>
                    <span aria-hidden="true">
                      <x-circle-icon
                        class="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      ></x-circle-icon>
                    </span>
                  </span>
                </td>
                <td class="table__data">
                  <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  >

                  {{ " " }}
                  <a
                    href="#"
                    class="font-medium text-indigo-600 hover:text-indigo-900"
                    >View</a
                  >
                </td>
              </tr>
            </tbody>
          </table>

          <pagination
            :current-page="currentPage"
            :total-pages="totalPages"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XCircleIcon } from "@heroicons/vue/solid";
import { CheckCircleIcon } from "@heroicons/vue/solid";
import Pagination from "@/components/misc/Pagination";
import { useAPI } from "@/composables/useAPI";
import { ref, watch } from "vue";

export default {
  name: "Institution",
  components: { Pagination, XCircleIcon, CheckCircleIcon },
  setup() {
    const { getInstitutions } = useAPI();
    const institutionData = getInstitutions();
    const institutions = ref([]);
    const totalPages = ref(0);
    const currentPage = ref(0);

    watch(institutionData, (newValue) => {
      institutions.value = newValue.content;
      totalPages.value = newValue["number_of_pages"];
      currentPage.value = newValue["page_number"];
    });

    return {
      institutions,
      totalPages,
      currentPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.table__head {
  @apply px-6;
  @apply py-3;
  @apply text-left text-xs;
  @apply font-medium;
  @apply text-gray-500;
  @apply uppercase;
  @apply tracking-wider;
}

.table__data {
  @apply px-6;
  @apply py-4;
  @apply whitespace-nowrap;
  @apply text-sm;
  @apply text-gray-500;

  &.table__data--bold {
    @apply font-medium;
    @apply text-gray-900;
  }
}
</style>
