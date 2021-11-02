import { computed, reactive } from "vue";

const selectionState = reactive([]);

const selectedCounter = computed(() => {
  return Object.keys(selectionState).filter((item) => {
    return selectionState[item].checked;
  }).length;
});

const addOptions = (optionIds) => {
  Object.assign(
    selectionState,
    optionIds.reduce((allOptions, optionId) => {
      allOptions[optionId] = {
        checked:
          (selectionState[optionId] && selectionState[optionId].checked) ||
          false,
      };

      return allOptions;
    }, {})
  );
};

const unselectAll = () => {
  Object.keys(selectionState).forEach((key) => {
    selectionState[key] = { checked: false };
  });
};

export const useMultiselect = () => {
  return {
    selectionState,
    selectedCounter,
    addOptions,
    unselectAll,
  };
};
