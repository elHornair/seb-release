import { reactive, readonly } from "vue";

export const useEntityCollection = (multiselect) => {
  const state = reactive({
    items: [],
    paging: {
      totalPages: 0,
      currentPages: 0,
    },
    multiselect: multiselect,
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

  return {
    entityCollectionState: readonly(state),
    setItems,
    setPaging,
  };
};
