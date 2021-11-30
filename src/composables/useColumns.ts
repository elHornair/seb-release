import { readonly, ref } from "vue";

const allColumnsVisible = ref(true);

const toggleColumns = () => {
  allColumnsVisible.value = !allColumnsVisible.value;
};

export const useColumns = () => {
  return {
    allColumnsVisible: readonly(allColumnsVisible),
    toggleColumns,
  };
};
