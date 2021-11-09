import { reactive, readonly } from "vue";
import { useMultiselect } from "@/composables/useMultiselect";

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

  const multiselect = useMultiselect(state);

  const setItems = (items) => {
    Object.assign(state.items, [], items);
  };

  const setPaging = (totalPages, currentPages) => {
    Object.assign(state.paging, {
      totalPages,
      currentPages,
    });
  };

  return {
    entityCollectionState: readonly(state),
    setItems,
    setPaging,
    multiselect,
  };
};
