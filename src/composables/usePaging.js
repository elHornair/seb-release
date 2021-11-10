import { computed } from "vue";

export const usePaging = (state) => {
  const setValues = (currentPage, totalPages) => {
    Object.assign(state.paging, {
      currentPage,
      totalPages,
    });
  };

  const currentPage = computed(() => state.paging.currentPage);
  const totalPages = computed(() => state.paging.totalPages);

  return {
    setValues,
    currentPage,
    totalPages,
  };
};
