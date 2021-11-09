<template>
  <input
    id="select_all"
    :checked="multiselect.allVisibleSelected.value"
    name="select_all"
    type="checkbox"
    class="checkbox"
    @change="
      multiselect.allVisibleSelected.value
        ? multiselect.unselectAllVisible()
        : multiselect.selectAllVisible()
    "
  />
  <label :for="`select_all`" class="sr-only">Select all</label>
  <MultiselectDropdown></MultiselectDropdown>
</template>

<script>
import MultiselectDropdown from "@/components/table/MultiselectDropdown";
import { useInstitutions } from "@/composables/institution/useInstitutions";

export default {
  name: "MultiselectControls",
  components: { MultiselectDropdown },
  setup() {
    const { multiselect } = useInstitutions();

    return {
      multiselect,
    };
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  @apply h-4;
  @apply w-4;
  @apply mt-0.5;
  @apply mr-1;
  @apply text-indigo-600;
  @apply border-gray-300;
  @apply rounded;
}
</style>
