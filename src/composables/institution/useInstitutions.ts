import { useEntityCollection } from "@/composables/useEntityCollection";
import { useInstitutionAPI } from "@/composables/institution/useInstitutionAPI";
import { useInstitutionSorting } from "@/composables/institution/useInstitutionSorting";
import { useInstitutionFiltering } from "@/composables/institution/useInstitutionFiltering";
const { readInstitutions } = useInstitutionAPI();

const {
  updateData,
  displayableItems,
  visibleItemsCount,
  isMultiselect,
  tableCaption,
  tableDescription,
  multiselect,
  paging,
  columns,
} = useEntityCollection(
  "institutions",
  useInstitutionSorting(),
  useInstitutionFiltering(),
  readInstitutions,
  // temporary hack for demo purposes only: in reality, the entity (here institutions) will define if it's multiselect
  window.location.search === "?multiselect"
);

export const useInstitutions = () => {
  return {
    updateData,
    displayableItems,
    visibleItemsCount,
    isMultiselect,
    tableCaption,
    tableDescription,
    multiselect,
    paging,
    columns,
  };
};
