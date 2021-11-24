<template>
  <view-split label-aside="Table Actions">
    <template #main>
      <ActiveFilters class="hidden xl:block"></ActiveFilters>
      <div
        role="region"
        aria-describedby="table_description"
        aria-labelledby="table_caption"
        tabindex="0"
        class="overflow-x-auto sm:rounded-sm"
      >
        <div class="table_wrapper">
          <p id="table_description" class="sr-only">{{ tableDescription }}</p>

          <MultiselectControls
            v-if="isMultiselect"
            class="absolute z-10 top-1.5 left-2 sm:top-1.5 sm:left-3"
          ></MultiselectControls>

          <table role="table" class="table">
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
            <thead
              role="rowgroup"
              class="hidden sm:table-header-group bg-gray-50"
            >
              <tr role="row" class="hidden sm:table-row">
                <th
                  v-if="isMultiselect"
                  role="columnheader"
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

                <th role="columnheader" scope="col" class="table_head_cell">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" class="table_body">
              <tr
                v-for="(institution, institutionIndex) in displayableItems"
                :key="institution.id"
                role="row"
                class="table_row"
                :class="{
                  'bg-white': institutionIndex % 2 === 0,
                  'bg-gray-50': institutionIndex % 2 !== 0,
                }"
              >
                <td
                  v-if="isMultiselect"
                  role="cell"
                  class="table_cell table_cell--selection"
                >
                  <label :for="`select_cb_${institution.id}`" class="sr-only"
                    >Select institution "{{ institution.name }}"</label
                  >
                  <input
                    :id="`select_cb_${institution.id}`"
                    :name="`select_cb_${institution.id}`"
                    :checked="multiselect.isSelected(institution.id)"
                    type="checkbox"
                    class="table_checkbox"
                    @change="
                      multiselect.isSelected(institution.id)
                        ? multiselect.removeSelected(institution.id)
                        : multiselect.addSelected(institution.id)
                    "
                  />
                </td>
                <td role="cell" class="table_cell table_cell--actions-mobile">
                  <InlineActionsDropdown
                    :institution="institution"
                    class="float-right"
                    @institution:change="updateData"
                  ></InlineActionsDropdown>
                </td>
                <TableContentField
                  v-for="field in fields"
                  :key="`${institutionIndex}_${field.name}`"
                  :class="{
                    table_cell: true,
                    'table_cell--spaced-left': isMultiselect,
                  }"
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
                <td role="cell" class="table_cell table_cell--actions-sm">
                  <InlineActionsDropdown
                    :institution="institution"
                    class="float-right"
                    @institution:change="updateData"
                  ></InlineActionsDropdown>
                </td>
              </tr>
            </tbody>
          </table>
          <Paging
            :current-page="paging.currentPage.value"
            :total-pages="paging.totalPages.value"
          ></Paging>
        </div>
      </div>
    </template>
    <template #aside>
      <ActionsPanel :fields="fields"></ActionsPanel>
    </template>
  </view-split>
</template>

<script>
import Paging from "@/components/misc/Paging";
import TableHeadField from "@/components/table/TableHeadField";
import ViewSplit from "@/components/layout/ViewSplit";
import StatusBadge from "@/components/misc/StatusBadge";
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
    Paging,
    StatusBadge,
  },
  setup() {
    const {
      displayableItems,
      updateData,
      tableCaption,
      tableDescription,
      isMultiselect,
      multiselect,
      paging,
    } = useInstitutions();

    updateData();

    return {
      displayableItems,
      isMultiselect,
      multiselect,
      paging,
      tableCaption,
      tableDescription,
      updateData,
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
          renderContentAs: "StatusBadge",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$selection-column-width: 1.5rem;
$selection-column-width-sm: 6rem;

.table_wrapper {
  @apply relative;
  @apply z-0;
  @apply align-middle;
  @apply inline-block;
  @apply min-w-full;
  @apply overflow-hidden;
  @apply pb-12;
}

.table {
  @apply block;
  @apply min-w-full;
  @apply divide-y;
  @apply divide-gray-200;
  @apply border;
  @apply border-t-0;
  @apply border-gray-200;

  @apply sm:table;
}

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
    width: $selection-column-width-sm;
    min-width: $selection-column-width-sm;
  }
}

.table_body {
  @apply block;
  @apply overflow-y-scroll;
  height: 80vh;

  @apply sm:table-row-group;
  @apply sm:overflow-y-auto;
  @apply sm:h-auto;
}

.table_row {
  /*
    a11y note: don't change the display property of this, as this will make screenreaders not interpret them as table
    columns anymore. This in turn means that "position: relative" doesn't work, which is why the first and last column
    are positioned in a very cumbersome way with floats (because we can't use "position: absolute" for them).
   */
}

.table_cell {
  @apply flex;
  @apply relative;
  @apply ml-1.5;
  @apply mr-7;
  @apply my-1;
  @apply px-1;
  @apply py-1.5;
  @apply font-normal;
  @apply text-sm;
  @apply text-left;
  @apply align-top;
  @apply text-gray-500;

  // manually calculate the correct width, as we can't use "width: 100%" because of the table_row's display property
  width: calc(100vw - 2.25rem);

  @screen sm {
    @apply table-cell;
    @apply m-0;
    @apply px-3;
    @apply py-2;
    width: auto;
  }

  &.table_cell--selection {
    width: $selection-column-width;
    min-width: $selection-column-width;
    @apply float-left;
    @apply m-0;
    @apply mt-1.5;
    @apply ml-1;

    @screen sm {
      width: $selection-column-width-sm;
      min-width: $selection-column-width-sm;
      @apply float-none;
      @apply m-0;
    }
  }

  &.table_cell--actions-mobile {
    width: $selection-column-width;
    min-width: $selection-column-width;
    @apply float-right;
    @apply m-0;
    @apply mt-1;
    @apply sm:hidden;
  }

  &.table_cell--actions-sm {
    @apply hidden;
    @apply sm:table-cell;
  }

  &.table_cell--spaced-left {
    @apply ml-8;

    // manually calculate the correct width, as we can't use "width: 100%" because of the table_row's display property
    width: calc(100vw - 4rem);

    @screen sm {
      @apply m-0;
      width: auto;
    }
  }
}

.table_checkbox {
  @apply h-4;
  @apply w-4;
  @apply text-primary-600;
  @apply border-gray-300;
  @apply rounded;
  @apply sm:-mt-1;
}
</style>
