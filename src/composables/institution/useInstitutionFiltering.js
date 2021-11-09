import { useFiltering } from "@/composables/useFiltering";

const institutionFiltering = useFiltering({
  name: {
    label: "Name",
  },
  urlSuffix: {
    label: "URL Suffix",
  },
  active: {
    label: "Status",
    valueFormatter: (value) =>
      value === true ? "Active" : value === false ? "Inactive" : "All",
  },
});

export const useInstitutionFiltering = () => {
  return institutionFiltering;
};
