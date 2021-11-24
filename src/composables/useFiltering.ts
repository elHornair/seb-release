import { computed, reactive, readonly, ref } from "vue";

export const useFiltering = (fields: {
  [key: string]: {
    label: string;
    valueFormatter?: Function;
  };
}) => {
  const fieldNames = Object.keys(fields);
  const initialState = fieldNames.reduce((reducedFields, fieldName) => {
    return Object.assign(reducedFields, {
      [fieldName]: null,
    });
  }, {});

  const state: {
    [key: string]: string;
  } = reactive(Object.assign({}, initialState));
  const filtersVisible = ref(false);

  const apiParam = computed(() =>
    Object.keys(state)
      .filter((fieldKey) => state[fieldKey] !== null)
      .reduce(
        (paramObj, fieldKey) =>
          Object.assign(paramObj, {
            [fieldKey]: state[fieldKey],
          }),
        {}
      )
  );

  const textualInfo = computed(() => {
    let text = Object.keys(state)
      .filter((fieldKey) => state[fieldKey] !== null)
      .join(", ");

    if (text) {
      text = `Currently filtered by ${text}.`;
    } else {
      text = "Currently not filtered.";
    }

    return text;
  });

  const showFilters = () => {
    filtersVisible.value = true;
  };

  const hideFilters = () => {
    filtersVisible.value = false;
  };

  const setFilters = (filters: { [key: string]: string }) => {
    Object.assign(state, initialState, filters);
  };

  const removeFilter = (field: string) => {
    if (!fieldNames.includes(field)) {
      throw new Error(`Unknown field "${field}"`);
    }

    Object.assign(state, {
      [field]: null,
    });
  };

  const removeAllFilters = () => {
    Object.assign(state, initialState);
  };

  const getFieldLabel = (field: string) => {
    if (!fieldNames.includes(field)) {
      throw new Error(`Unknown field "${field}"`);
    }

    return fields[field].label;
  };

  const getFieldValue = (field: string, rawValue: string | boolean) => {
    if (!fieldNames.includes(field)) {
      throw new Error(`Unknown field "${field}"`);
    }

    const formattingFunction =
      fields[field].valueFormatter || ((val: string | boolean) => val);

    return formattingFunction(rawValue);
  };

  const activeFilters = computed(() => {
    return Object.keys(state)
      .filter((key) => state[key] !== null)
      .map((key) => {
        return { field: key, value: state[key] };
      });
  });

  const activeFiltersCount = computed(() => activeFilters.value.length);

  const hasActiveFilters = computed(() => activeFiltersCount.value > 0);

  const activeFiltersLabel = computed(
    () =>
      `${activeFiltersCount.value} filter${
        activeFiltersCount.value > 1 ? "s" : ""
      }`
  );

  return {
    filteringState: readonly(state),
    filteringApiParam: apiParam,
    filtersVisible: readonly(filtersVisible),
    showFilters,
    hideFilters,
    setFilters,
    removeFilter,
    removeAllFilters,
    getFieldLabel,
    getFieldValue,
    activeFilters,
    hasActiveFilters,
    activeFiltersLabel,
    textualInfo,
  };
};
