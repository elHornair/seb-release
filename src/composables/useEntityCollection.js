import { computed, reactive, readonly } from "vue";
import { useMultiselect } from "@/composables/useMultiselect";
import { usePaging } from "@/composables/usePaging";

export const useEntityCollection = (isMultiselect) => {
  const state = reactive({
    items: [],
    selectedItems: [],
    paging: {
      currentPage: 0,
      totalPages: 0,
    },
    isMultiselect: isMultiselect,
    keepSelectedOnTop: false,
  });

  const multiselect = useMultiselect(state);
  const paging = usePaging(state);

  const setItems = (items) => {
    Object.assign(state.items, [], items);
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
