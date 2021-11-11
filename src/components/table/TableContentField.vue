<template>
  <component
    :is="isHeader ? 'th' : 'td'"
    scope="row"
    :class="{
      'bg-primary-50': isSorted,
    }"
  >
    <span class="label">{{ label }}<span :aria-hidden="true">:</span></span>
    <span
      :class="{
        content: true,
        'content--header': isHeader,
      }"
      ><slot></slot
    ></span>
  </component>
</template>

<script>
import { useInstitutionSorting } from "@/composables/institution/useInstitutionSorting";
import { computed } from "vue";

export default {
  name: "TableContentField",
  props: {
    label: {
      type: String,
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    isHeader: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    const { sortingState } = useInstitutionSorting();

    return {
      isSorted: computed(() => sortingState.field === props.fieldName),
    };
  },
};
</script>

<style lang="scss" scoped>
.label {
  @apply text-xs;
  @apply font-medium;
  @apply text-gray-900;
  @apply uppercase;
  @apply tracking-wider;

  padding-top: 0.16rem;
  @apply pr-2;
  min-width: 5.5rem;
  @apply sm:hidden;
}

.content {
  @apply text-gray-700;
  @apply flex-grow;

  &.content--header {
    @apply font-medium;
    @apply text-gray-900;
  }
}
</style>
