<template>
  <div class="flex">
    <input
      id="select_all"
      :checked="multiselect.areAllVisibleSelected.value"
      name="select_all"
      type="checkbox"
      class="checkbox"
      @change="
        multiselect.areAllVisibleSelected.value
          ? multiselect.deselectAllVisible()
          : multiselect.selectAllVisible()
      "
    />
    <label :for="`select_all`" class="sr-only">Select all institutions</label>
    <span v-if="multiselect.selectedCount.value > 0" class="badge"
      >{{ multiselect.selectedCount.value }}
      <span class="sr-only">institutions are currently selected</span></span
    >
    <MultiselectDropdown></MultiselectDropdown>
  </div>
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
  @apply mr-2;
  @apply text-primary-600;
  @apply border-gray-300;
  @apply rounded;
}

.badge {
  @apply inline-flex;
  @apply items-center;
  @apply mr-0.5;
  @apply px-1.5;
  @apply py-0.5;
  @apply rounded-full;
  @apply text-xs;
  @apply font-normal;
  @apply bg-gray-300;
  @apply text-gray-800;
}
</style>
