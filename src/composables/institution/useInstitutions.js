import { useEntityCollection } from "@/composables/useEntityCollection";
import { useInstitutionAPI } from "@/composables/institution/useInstitutionAPI";
import { useInstitutionSorting } from "@/composables/institution/useInstitutionSorting";
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";

import { computed, watch } from "vue";

const {
  entityCollectionState,
  setItems,
  visibleItemsCount,
  multiselect,
  paging,
} = useEntityCollection(
  // temporary hack for demo purposes only: in reality, the entity (here institutions) will define if it's multiselect
  window.location.search === "?multiselect"
);

// TODO: generalise: most of the code in here can probably be moved to useEntityCollection.js and be shared with other collections
const { readInstitutions } = useInstitutionAPI();
const { sortingState, sortingApiParam, SORT_DIRECTION } =
  useInstitutionSorting();
const { filteringState, filteringApiParam } = useInstitutionFiltering();

const updateInstitutionData = async () => {
  const institutionData = await readInstitutions(
    {
      sort: sortingApiParam.value,
      itemsPerPage: paging.itemsPerPage.value,
      pageIndex: paging.apiParamPageIndex.value,
    },
    filteringApiParam.value
  );

  paging.setValues(
    institutionData["page_number"],
    institutionData["number_of_pages"]
  );

  setItems(institutionData["content"]);
};

const isMultiselect = computed(() => entityCollectionState.isMultiselect);

watch(paging.apiParamPageIndex, () => updateInstitutionData());
watch(sortingApiParam, () => updateInstitutionData());
watch(filteringApiParam, async () => {
  await updateInstitutionData();

  if (isMultiselect.value) {
    multiselect.deselectAll();
  }
});

const displayableItems = computed(() => {
  return entityCollectionState.items;
});

const tableCaption = "List of institutions";
const tableDescription = computed(() => {
  let currentSortingInfo;
  let currentFilteringInfo = Object.keys(filteringState)
    .filter((fieldKey) => filteringState[fieldKey] !== null)
    .join(", ");
  let pagingInfo = "";

  if (currentFilteringInfo) {
    currentFilteringInfo = `Currently filtered by ${currentFilteringInfo}`;
  } else {
    currentFilteringInfo = "Currently not filtered";
  }

  if (sortingState.field) {
    currentSortingInfo = `Currently sorted by ${sortingState.field} ${
      sortingState.direction === SORT_DIRECTION.ASC ? "Z to A" : "A to Z"
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

export const useInstitutions = () => {
  return {
    updateInstitutionData,
    displayableItems,
    visibleItemsCount,
    isMultiselect,
    tableCaption,
    tableDescription,
    multiselect,
    paging,
  };
};
