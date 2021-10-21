<template>
  <component
    :is="componentType"
    :type="isLink ? null : type"
    :to="isLink ? routeObj : null"
    class="button"
    :class="{ 'button--primary': primary, 'button--secondary': !primary }"
  >
    <span aria-hidden="true">
      <slot name="icon"></slot>
    </span>
    {{ label }}
  </component>
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
        return ["button", "submit", "reset", "link"].includes(value);
      },
    },
    primary: {
      type: Boolean,
      default: true,
    },
    routeObj: {
      type: Object,
      default: null,
      required: false,
    },
  },

  computed: {
    isLink() {
      return this.type === "link";
    },
    componentType() {
      return this.isLink ? "router-link" : "button";
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
  @apply w-full;
  @apply sm:w-auto;
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
