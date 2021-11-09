import { useEntityCollection } from "@/composables/useEntityCollection";
import { useInstitutionAPI } from "@/composables/institution/useInstitutionAPI";
import { useInstitutionSorting } from "@/composables/institution/useInstitutionSorting";
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";
const { multiSelectionState, selectedCounter, addOptions, unselectAll } =
  useMultiselect();
import { computed, watch } from "vue";
import { useMultiselect } from "@/composables/useMultiselect";

const { entityCollectionState, setItems, setPaging } = useEntityCollection(
  // temporary hack for demo purposes only: in reality, the entity (here institutions) will define if it's multiselect
  window.location.search === "?multiselect"
);

const { readInstitutions } = useInstitutionAPI();
const { sortingApiParam } = useInstitutionSorting();
const { filteringApiParam } = useInstitutionFiltering();

const updateInstitutionData = async () => {
  const institutionData = await readInstitutions(
    {
      sort: sortingApiParam.value,
    },
    filteringApiParam.value
  );

  setPaging(institutionData["number_of_pages"], institutionData["page_number"]);
  setItems(institutionData["content"]);
};

const isMultiselect = computed(() => entityCollectionState.multiselect);

watch(sortingApiParam, () => updateInstitutionData());
watch(filteringApiParam, async () => {
  await updateInstitutionData();

  if (entityCollectionState.multiselect) {
    unselectAll();
  }
});

watch(entityCollectionState.items, () => {
  if (entityCollectionState.multiselect) {
    addOptions(
      entityCollectionState.items.map((institution) => institution.id)
    );
  }
});

export const useInstitutions = () => {
  return {
    institutionsState: entityCollectionState,
    updateInstitutionData,
    selectedCounter,
    multiSelectionState,
    isMultiselect,
  };
};
