import { readonly, ref } from "vue";

const allColumnsVisible = ref(false);

const toggleColumns = () => {
  allColumnsVisible.value = !allColumnsVisible.value;
};

export const useColumns = () => {
  return {
    allColumnsVisible: readonly(allColumnsVisible),
    toggleColumns,
  };
};
