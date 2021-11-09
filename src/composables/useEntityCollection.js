import { reactive, readonly } from "vue";

export const useEntityCollection = () => {
  const state = reactive({
    items: [],
    paging: {
      totalPages: 0,
      currentPages: 0,
    },
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
