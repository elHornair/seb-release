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
  name: "StatusBadge",
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
  @apply border-l-4;
  @apply pl-1.5;
}

.batch--active {
  @apply border-green-700;
}

.batch--inactive {
  @apply border-red-700;
}
</style>
