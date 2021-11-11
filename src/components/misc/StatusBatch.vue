<template>
  <span
    class="batch"
    :class="{
      'batch--active': value,
      'batch--inactive': !value,
    }"
  >
    <span aria-hidden="true">
      <svg class="icon" fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
    </span>
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
}

.icon {
  @apply mr-1;
  @apply h-2;
  @apply w-2;
}

.batch--active {
  .icon {
    @apply text-green-700;
  }
}

.batch--inactive {
  .icon {
    @apply text-red-700;
  }
}
</style>
