import { computed, reactive, watch } from "vue";
import { useMultiselect } from "@/composables/useMultiselect";
import { usePaging } from "@/composables/usePaging";

export const useEntityCollection = (
  collectionName,
  sorting,
  filtering,
  readListAPIFunction,
  isMultiselect
) => {
  const state = reactive({
    items: [],
    selectedItems: [],
    paging: {
      currentPage: 1,
      totalPages: 1,
    },
  });

  const setItems = (items) => {
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
  const tableCaption = `List of ${collectionName}`;

  const tableDescription = computed(() => {
    let currentSortingInfo;
    let currentFilteringInfo = Object.keys(filtering.filteringState)
      .filter((fieldKey) => filtering.filteringState[fieldKey] !== null)
      .join(", ");
    let pagingInfo = "";

    if (currentFilteringInfo) {
      currentFilteringInfo = `Currently filtered by ${currentFilteringInfo}`;
    } else {
      currentFilteringInfo = "Currently not filtered";
    }

    if (sorting.sortingState.field) {
      currentSortingInfo = `Currently sorted by ${sorting.sortingState.field} ${
        sorting.sortingState.direction === sorting.SORT_DIRECTION.ASC
          ? "Z to A"
          : "A to Z"
      }`;
    } else {
      currentSortingInfo = "Currently not sorted";
    }

    if (paging.totalPages.value > 1) {
      pagingInfo += `You are on page ${paging.currentPage.value} of ${paging.totalPages.value}. `;
      pagingInfo += "Go to paging navigation landmark to switch page.";
    }

    return `${tableCaption}. ${currentFilteringInfo}. ${currentSortingInfo}. Go to table actions landmark to adapt filtering and sorting. ${pagingInfo}`;
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
