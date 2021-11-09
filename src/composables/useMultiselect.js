import { computed } from "vue";

export const useMultiselect = (state) => {
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

  const unselectAllVisible = () => {
    state.selectedItems = [
      ...state.selectedItems.filter((selectedItem) => {
        return !state.items.find((item) => item.id === selectedItem.id);
      }),
    ];
  };

  const selectAllVisible = () => {
    state.selectedItems = [...state.selectedItems, ...state.items];
  };

  const isSelected = (id) => {
    return state.selectedItems.find((item) => item.id === id);
  };

  const allVisibleSelected = computed(() => {
    return !state.items.find((item) => !isSelected(item.id));
  });

  const selectedCounter = computed(() => state.selectedItems.length);

  return {
    addSelected,
    removeSelected,
    unselectAll,
    unselectAllVisible,
    selectAllVisible,
    isSelected,
    allVisibleSelected,
    selectedCounter,
  };
};
