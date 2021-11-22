import { computed, readonly, ref } from "vue";

const itemsPerPage = ref(10);

export const usePaging = (state) => {
  const setValues = (currentPage, totalPages) => {
    Object.assign(state.paging, {
      currentPage,
      totalPages,
    });
  };

  const desiredPage = ref(state.paging.currentPage);
  const apiParamPageIndex = computed(() => desiredPage.value);

  const goToPage = (index) => {
    desiredPage.value = index;
  };

  const currentPage = computed(() => parseInt(state.paging.currentPage));
  const totalPages = computed(() => parseInt(state.paging.totalPages));

  const totalItems = computed(() => {
    // this is an estimate, because the API doesn't expose this
    return Math.round(
      totalPages.value * itemsPerPage.value - totalPages.value / 2
    );

    // TODO: if there is only one page, we can show the EXACT number
  });

  const firstVisibleItem = computed(
    () => itemsPerPage.value * currentPage.value - itemsPerPage.value + 1
  );
  const lastVisibleItem = computed(
    () => itemsPerPage.value * currentPage.value
  );

  const prevPage = computed(() =>
    currentPage.value > 1 ? currentPage.value - 1 : 0
  );

  const nextPage = computed(() =>
    currentPage.value < totalPages.value ? currentPage.value + 1 : 0
  );

  const showFirstPage = computed(() => {
    return !(
      totalPages.value <= 1 ||
      currentPage.value === 1 ||
      prevPage.value === 1
    );
  });

  const showLastPage = computed(() => {
    return !(
      currentPage.value === totalPages.value ||
      nextPage.value === totalPages.value
    );
  });

  const showFillerAfterFirstPage = computed(() => {
    return (
      showFirstPage.value && prevPage.value !== 0 && prevPage.value - 1 > 1
    );
  });

  const showFillerBeforeLastPage = computed(() => {
    return (
      showLastPage.value &&
      nextPage.value !== totalPages.value &&
      totalPages.value - nextPage.value > 1
    );
  });

  return {
    setValues,
    goToPage,
    itemsPerPage: readonly(itemsPerPage),
    apiParamPageIndex,
    firstVisibleItem,
    lastVisibleItem,
    currentPage,
    prevPage,
    nextPage,
    totalPages,
    totalItems,
    showFirstPage,
    showLastPage,
    showFillerAfterFirstPage,
    showFillerBeforeLastPage,
  };
};
