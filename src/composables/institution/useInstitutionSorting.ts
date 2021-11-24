import { useSorting } from "@/composables/useSorting";

const institutionSorting = useSorting();

export const useInstitutionSorting = () => {
  return institutionSorting;
};
