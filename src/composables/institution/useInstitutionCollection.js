import { useEntityCollection } from "@/composables/useEntityCollection";

const { entityCollectionState, ...rest } = useEntityCollection();

export const useInstitutionCollection = () => {
  return {
    institutionsState: entityCollectionState,
    ...rest,
  };
};
