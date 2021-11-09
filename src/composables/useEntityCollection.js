import { reactive, readonly } from "vue";

export const useEntityCollection = () => {
  const state = reactive({ items: [] });

  const setItems = (items) => {
    Object.assign(state.items, [], items);
  };

  return {
    entityCollectionState: readonly(state),
    setItems,
  };
};
