import { computed, reactive, readonly } from "vue";

export const useSorting = () => {
  const state = reactive({
    field: null,
    direction: null,
  });

  const SORT_DIRECTION = {
    ASC: "ASC",
    DSC: "DSC",
  };

  const apiParam = computed(() => {
    return state.field
      ? `${state.direction === SORT_DIRECTION.ASC ? "-" : ""}${state.field}`
      : null;
  });

  const textualInfo = computed(() => {
    let text = "";

    if (state.field) {
      text = `Currently sorted by ${state.field} ${
        state.direction === SORT_DIRECTION.ASC ? "Z to A" : "A to Z"
      }.`;
    } else {
      text = "Currently not sorted.";
    }

    return text;
  });

  const setSorting = (field: string, direction: "ASC" | "DSC") => {
    Object.assign(state, {
      field: field,
      direction: direction,
    });
  };

  const removeSorting = () => {
    Object.assign(state, {
      field: null,
      direction: null,
    });
  };

  return {
    SORT_DIRECTION: readonly(SORT_DIRECTION),
    sortingState: readonly(state),
    sortingApiParam: readonly(apiParam),
    setSorting,
    removeSorting,
    textualInfo,
  };
};
