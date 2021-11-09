import { useSorting } from "@/composables/useSorting";

const {
  SORT_DIRECTION,
  sortingState,
  sortingApiParam,
  setSorting,
  removeSorting,
} = useSorting();

export const useInstitutionSorting = () => {
  return {
    SORT_DIRECTION,
    sortingState,
    sortingApiParam,
    setSorting,
    removeSorting,
  };
};
