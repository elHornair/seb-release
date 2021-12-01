import { computed, readonly, ref } from "vue";

const allColumnsVisible = ref(false);

const toggleColumns = () => {
  allColumnsVisible.value = !allColumnsVisible.value;
};

const textualInfo = computed(() => {
  let text = "";

  if (!allColumnsVisible.value) {
    text = "Currently some columns are hidden.";
  } else {
    text = "Currently all columns are visible.";
  }

  return text;
});

export const useColumns = () => {
  return {
    allColumnsVisible: readonly(allColumnsVisible),
    toggleColumns,
    textualInfo,
  };
};
