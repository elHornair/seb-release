import { computed, reactive } from "vue";

const selectionState = reactive([]);

const selectedCounter = computed(() => {
  return Object.keys(selectionState).filter((item) => {
    return selectionState[item].checked;
  }).length;
});

const addOptions = (options) => {
  // TODO: this should only get an array of ids, not an array of objects containing an id
  Object.assign(
    selectionState,
    options
      .map((option) => option.id)
      .reduce((all, optionId) => {
        all[optionId] = {
          checked:
            (selectionState[optionId] && selectionState[optionId].checked) ||
            false,
        };

        return all;
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
