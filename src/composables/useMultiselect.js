import { computed, reactive } from "vue";

const selectedInstitutionsState = reactive([]);

const selectedInstitutionsCounter = computed(() => {
  return Object.keys(selectedInstitutionsState).filter((item) => {
    return selectedInstitutionsState[item].checked;
  }).length;
});

const addSelectableInstitutions = (institutions) => {
  Object.assign(
    selectedInstitutionsState,
    institutions
      .map((institution) => institution.id)
      .reduce((all, institutionId) => {
        all[institutionId] = {
          checked:
            (selectedInstitutionsState[institutionId] &&
              selectedInstitutionsState[institutionId].checked) ||
            false,
        };

        return all;
      }, {})
  );
};

const unselectAllInstitutions = () => {
  Object.keys(selectedInstitutionsState).forEach((key) => {
    selectedInstitutionsState[key] = { checked: false };
  });
};

export const useMultiselect = () => {
  return {
    selectedInstitutionsState,
    selectedInstitutionsCounter,
    addSelectableInstitutions,
    unselectAllInstitutions,
  };
};
