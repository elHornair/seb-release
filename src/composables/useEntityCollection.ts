import { computed, reactive, watch } from "vue";
import { useMultiselect } from "@/composables/useMultiselect";
import { usePaging } from "@/composables/usePaging";

export const useEntityCollection = (
  collectionName: string,
  sorting: {
    sortingApiParam: {
      value: string | null;
    };
    textualInfo: {
      value: string;
    };
  },
  filtering: {
    filteringApiParam: {
      value: {};
    };
    textualInfo: {
      value: string;
    };
  },
  readListAPIFunction: Function,
  isMultiselect: boolean
) => {
  const state = reactive({
    items: [],
    selectedItems: [],
    paging: {
      currentPage: 1,
      totalPages: 1,
    },
  });

  const setItems = (items: {}[]) => {
    state.items = Object.assign([], items);
  };

  const updateData = async () => {
    const apiResultData = await readListAPIFunction(
      {
        sort: sorting.sortingApiParam.value,
        itemsPerPage: paging.itemsPerPage.value,
        pageIndex: paging.apiParamPageIndex.value,
      },
      filtering.filteringApiParam.value
    );

    paging.setValues(
      apiResultData["page_number"],
      apiResultData["number_of_pages"]
    );

    setItems(apiResultData["content"]);
  };

  const displayableItems = computed(() => state.items);
  const visibleItemsCount = computed(() => displayableItems.value.length);
  const multiselect = useMultiselect(state);
  const paging = usePaging(state, visibleItemsCount);
  const tableCaption = `Table of ${collectionName}`;

  const tableDescription = computed(() => {
    return `${tableCaption}. ${filtering.textualInfo.value} ${sorting.textualInfo.value} Go to table actions landmark to adapt filtering and sorting. ${paging.textualInfo.value}`;
  });

  watch(paging.apiParamPageIndex, () => updateData());
  watch(sorting.sortingApiParam, () => updateData());
  watch(filtering.filteringApiParam, async () => {
    await updateData();

    if (isMultiselect) {
      multiselect.deselectAll();
    }
  });

  return {
    updateData,
    displayableItems,
    visibleItemsCount,
    isMultiselect,
    tableCaption,
    tableDescription,
    multiselect,
    paging,
  };
};
