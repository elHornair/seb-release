<template>
  <button
    :type="type"
    class="button"
    :class="{ 'button--primary': primary, 'button--secondary': !primary }"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "button",
      validator(value) {
        return ["button", "submit", "reset"].includes(value);
      },
    },
    primary: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  @apply inline-flex;
  @apply justify-center;
  @apply py-2;
  @apply px-4;
  @apply border;
  @apply rounded-md;
  @apply text-sm;
  @apply font-medium;
  @apply shadow-sm;

  @apply focus:outline-none;
  @apply focus:ring-2;
  @apply focus:ring-offset-2;
  @apply focus:ring-indigo-500;
}

.button--primary {
  @apply border-transparent;
  @apply text-white;
  @apply bg-indigo-600;
  @apply hover:bg-indigo-700;
}

.button--secondary {
  @apply bg-white;
  @apply border-gray-300;
  @apply text-gray-700;
  @apply hover:bg-gray-50;
}
</style>
