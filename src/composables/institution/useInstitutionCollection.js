import { useEntityCollection } from "@/composables/useEntityCollection";
import { useInstitutionAPI } from "@/composables/institution/useInstitutionAPI";
import { useInstitutionSorting } from "@/composables/institution/useInstitutionSorting";
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";

const { entityCollectionState, setItems, setPaging } = useEntityCollection();
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

export const useInstitutionCollection = () => {
  return {
    institutionsState: entityCollectionState,
    updateInstitutionData,
  };
};
