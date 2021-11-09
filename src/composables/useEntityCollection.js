import { computed, reactive, readonly } from "vue";

export const useEntityCollection = (isMultiselect) => {
  const state = reactive({
    items: [],
    selectedItems: [],
    paging: {
      totalPages: 0,
      currentPages: 0,
    },
    isMultiselect: isMultiselect,
  });

  const setItems = (items) => {
    Object.assign(state.items, [], items);
  };

  const setPaging = (totalPages, currentPages) => {
    Object.assign(state.paging, {
      totalPages,
      currentPages,
    });
  };

  const addSelected = (id) => {
    const item = state.items.find((item) => item.id === id);

    if (!item) {
      throw new Error(`Item with id "${id}" doesn't exist.`);
    }

    if (state.selectedItems.find((item) => item.id === id)) {
      throw new Error(`Item with id "${id}" is already selected.`);
    }

    state.selectedItems = [...state.selectedItems, item];
  };

  const removeSelected = (id) => {
    state.selectedItems = [
      ...state.selectedItems.filter((item) => item.id !== id),
    ];
  };

  const unselectAll = () => {
    state.selectedItems = [];
  };

  const selectAllVisible = () => {
    state.selectedItems = [...state.selectedItems, ...state.items];
  };

  const isSelected = (id) => {
    return state.selectedItems.find((item) => item.id === id);
  };

  const selectedCounter = computed(() => state.selectedItems.length);

  return {
    entityCollectionState: readonly(state),
    setItems,
    setPaging,
    addSelected,
    removeSelected,
    unselectAll,
    selectAllVisible,
    isSelected,
    selectedCounter,
  };
};
