<template>
  <view-split label-aside="Controls">
    <template #main>
      <ActiveFilters class="hidden xl:block"></ActiveFilters>
      <div
        role="region"
        aria-describedby="table_description"
        aria-labelledby="table_caption"
        tabindex="0"
        class="overflow-x-auto border border-t-0 border-gray-200 sm:rounded-sm"
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
            class="absolute z-10 top-1.5 left-2 sm:top-1.5 sm:left-3"
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
                  style="width: 6rem; min-width: 6rem"
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
                    class="float-right"
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
    </template>
    <template #aside>
      <ActionsPanel :fields="fields"></ActionsPanel>
    </template>
  </view-split>
</template>

<script>
import Pagination from "@/components/misc/Pagination";
import TableHeadField from "@/components/table/TableHeadField";
import ViewSplit from "@/components/layout/ViewSplit";
import StatusBatch from "@/components/misc/StatusBatch";
import ActiveFilters from "@/components/filter/ActiveFilters";
import InlineActionsDropdown from "@/components/table/InlineActionsDropdown";
import TableContentField from "@/components/table/TableContentField";
import MultiselectControls from "@/components/table/MultiselectControls";
import ActionsPanel from "@/components/table/ActionsPanel";
import { useInstitutions } from "@/composables/institution/useInstitutions";

export default {
  name: "Institution",
  components: {
    ActionsPanel,
    MultiselectControls,
    TableContentField,
    InlineActionsDropdown,
    ActiveFilters,
    ViewSplit,
    TableHeadField,
    Pagination,
    StatusBatch,
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

    updateInstitutionData();

    return {
      displayableItems,
      isMultiselect,
      multiselect,
      paging,
      tableCaption,
      tableDescription,
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
  @apply px-2.5;
  @apply py-2;
  @apply text-gray-900;
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
  @apply px-3;
  @apply py-1.5;

  &.table_head_cell--selection {
    width: 6rem;
    min-width: 6rem;
  }
}

.table_row {
  @apply block;
  @apply relative;
  @apply pl-1.5;
  @apply pr-7;
  @apply py-1;
  @apply sm:table-row;
  @apply sm:pl-0;
  @apply sm:pr-0;
  @apply sm:py-0;

  &.table_row--multiselect {
    @apply pl-8;
    @apply sm:pl-0;
  }
}

.table_cell {
  @apply flex;
  @apply relative;
  @apply px-1;
  @apply py-1.5;
  @apply font-normal;
  @apply text-sm;
  @apply text-left;
  @apply align-top;
  @apply text-gray-500;
  @apply sm:table-cell;
  @apply sm:px-3;
  @apply sm:py-2;

  &.table_cell--break-out-left {
    @apply absolute;
    @apply top-1.5;
    @apply left-1;
    @apply sm:relative;
    @apply sm:top-auto;
    @apply sm:left-auto;
    @apply sm:px-3;
  }

  &.table_cell--break-out-right {
    @apply absolute;
    @apply top-1;
    @apply right-0;
    @apply sm:relative;
    @apply sm:top-auto;
    @apply sm:right-auto;
    @apply sm:px-3;
  }
}

.table__checkbox {
  @apply h-4;
  @apply w-4;
  @apply text-primary-600;
  @apply border-gray-300;
  @apply rounded;
}
</style>
