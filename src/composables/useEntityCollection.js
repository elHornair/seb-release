import { computed, reactive, readonly } from "vue";
import { useMultiselect } from "@/composables/useMultiselect";
import { usePaging } from "@/composables/usePaging";

export const useEntityCollection = (isMultiselect) => {
  const state = reactive({
    items: [],
    selectedItems: [],
    paging: {
      currentPage: 1,
      totalPages: 1,
    },
    isMultiselect: isMultiselect,
  });

  const multiselect = useMultiselect(state);
  const paging = usePaging(state);

  const setItems = (items) => {
    state.items = Object.assign([], items);
  };

  const visibleItemsCount = computed(() => state.items.length);

  return {
    entityCollectionState: readonly(state),
    setItems,
    visibleItemsCount,
    multiselect,
    paging,
  };
};
