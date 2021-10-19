<template>
  <div>
    <span
      aria-hidden="true"
      class="text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      {{ description }}
    </span>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <input
        :id="name"
        :name="name"
        :checked="modelValue"
        :disabled="disabled"
        :aria-hidden="disabled"
        type="checkbox"
        class="input"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
      <label
        :for="name"
        class="label"
        :class="{ 'label--disabled': disabled }"
        >{{ label }}</label
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInputCheckbox",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.input {
  @apply h-4;
  @apply w-4;
  @apply text-indigo-600;
  @apply border-gray-300;
  @apply rounded;

  &:disabled {
    @apply cursor-not-allowed;
    @apply opacity-70;
  }
}

.label {
  @apply ml-3;
  @apply text-sm;
  @apply font-medium;
  @apply text-gray-700;
  @apply sm:mt-px;
  @apply sm:pt-2;

  &.label--disabled {
    @apply cursor-not-allowed;
    @apply opacity-70;
  }
}
</style>
