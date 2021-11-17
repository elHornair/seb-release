<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 sm:mt-0 sm:pt-1.5"
    >
      {{ label
      }}<span v-if="required" aria-hidden="true" class="text-red-700">*</span>
    </label>
    <div class="sm:col-span-2">
      <input
        :id="name"
        :name="name"
        :value="modelValue"
        :required="required"
        :minlength="minLength"
        :maxlength="maxLength"
        type="text"
        autocomplete="off"
        class="input"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInputText",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
      default: null,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    minLength: {
      type: Number,
      required: false,
      default: null,
    },
    maxLength: {
      type: Number,
      required: false,
      default: null,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<style lang="scss" scoped>
.input {
  @apply block;
  @apply w-full;
  @apply mt-1;
  @apply px-2;
  @apply py-1.5;
  @apply shadow-sm;
  @apply border-gray-300;
  @apply focus:border-primary-600;
  @apply rounded-sm;

  @apply sm:mt-0;
  @apply sm:text-sm;
}
</style>
