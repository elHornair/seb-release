<template>
  <span
    class="batch"
    :class="{
      'batch--active': value,
      'batch--inactive': !value,
    }"
  >
    {{ label }}
  </span>
</template>

<script>
import { computed } from "vue";

export default {
  name: "StatusBatch",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    return { label: computed(() => (props.value ? "Active" : "Inactive")) };
  },
};
</script>

<style lang="scss" scoped>
.batch {
  @apply inline-flex;
  @apply items-center;
  @apply -my-0.5;
  @apply px-3;
  @apply py-0.5;
  @apply rounded-full;
  @apply text-sm;
  @apply font-medium;
}

.batch--active {
  @apply bg-green-100;
  @apply text-green-800;
}

.batch--inactive {
  @apply bg-red-100;
  @apply text-red-800;
}
</style>
