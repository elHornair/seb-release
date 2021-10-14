import { computed, reactive, readonly } from "vue";

const SORT_DIRECTION = {
  ASC: "ASC",
  DSC: "DSC",
};

const state = reactive({
  field: null,
  direction: null,
});

const apiParam = computed(() => {
  return state.field
    ? `${state.direction === SORT_DIRECTION.ASC ? "-" : ""}${state.field}`
    : null;
});

const setSorting = (field, direction) => {
  if (!Object.values(SORT_DIRECTION).includes(direction)) {
    console.error(`Unknown sorting direction "${direction}"`);
  }

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

export const useSorting = () => {
  return {
    SORT_DIRECTION: readonly(SORT_DIRECTION),
    sortingState: readonly(state),
    sortingApiParam: readonly(apiParam),
    setSorting,
    removeSorting,
  };
};
