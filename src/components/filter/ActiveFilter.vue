<template>
  <span class="active-filter">
    <button
      type="button"
      :aria-label="`Remove filter ${label}`"
      @click="removeFilter(field)"
    >
      <span aria-hidden="true">
        <XCircleIcon class="h-5 w-5 hover:text-black"></XCircleIcon>
      </span>
    </button>
    <span class="active-filter__label">
      {{ label }}
    </span>
    <span class="active-filter__value">
      {{ formattedValue }}
    </span>
  </span>
</template>

<script>
import { useFiltering } from "@/composables/useFiltering";
import { computed } from "vue";
import { XCircleIcon } from "@heroicons/vue/solid";

export default {
  name: "ActiveFilter",
  components: { XCircleIcon },
  props: {
    field: {
      type: String,
      required: true,
    },
    value: {
      type: [Boolean, String],
      required: true,
    },
  },
  setup(props) {
    const { removeFilter, getFieldLabel, getFieldValue } = useFiltering();

    const label = computed(() => {
      return getFieldLabel(props.field);
    });

    const formattedValue = computed(() => {
      return getFieldValue(props.field, props.value);
    });

    return {
      removeFilter,
      label,
      formattedValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.active-filter {
  @apply inline-flex;
  @apply justify-center;
  @apply py-2;
  @apply px-4;
  @apply rounded-md;
  @apply text-sm;
  @apply text-gray-700;
  @apply font-medium;
  @apply shadow-sm;
  @apply bg-gray-300;

  max-width: 12rem;
}

.active-filter__label {
  @apply mx-2;
  @apply pl-2;
  @apply border-l;
  @apply border-white;
}

.active-filter__value {
  @apply truncate;
  @apply rounded-sm;
  @apply bg-white;
  @apply px-1.5;
  @apply py-0.5;
  @apply -my-0.5;
  @apply font-normal;
}
</style>
