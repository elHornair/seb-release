<template>
  <span
    class="batch"
    :class="{
      'batch--active': active,
      'batch--inactive': !active,
    }"
  >
    {{ label }}
  </span>
</template>

<script>
export default {
  name: "StatusBatch",
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    label() {
      return this.active ? "Active" : "Inactive";
    },
  },
};
</script>

<style lang="scss" scoped>
.batch {
  @apply inline-flex;
  @apply items-center;
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
