import { computed, reactive } from "vue";

const multiSelectionState = reactive([]);

const selectedCounter = computed(() => {
  return Object.keys(multiSelectionState).filter((item) => {
    return multiSelectionState[item].checked;
  }).length;
});

const addOptions = (optionIds) => {
  Object.assign(
    multiSelectionState,
    optionIds.reduce((allOptions, optionId) => {
      allOptions[optionId] = {
        checked:
          (multiSelectionState[optionId] &&
            multiSelectionState[optionId].checked) ||
          false,
      };

      return allOptions;
    }, {})
  );
};

const unselectAll = () => {
  Object.keys(multiSelectionState).forEach((key) => {
    multiSelectionState[key] = { checked: false };
  });
};

export const useMultiselect = () => {
  return {
    multiSelectionState,
    selectedCounter,
    addOptions,
    unselectAll,
  };
};
