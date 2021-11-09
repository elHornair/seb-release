import { useFiltering } from "@/composables/useFiltering";

const institutionFiltering = useFiltering();

export const useInstitutionFiltering = () => {
  return institutionFiltering;
};
