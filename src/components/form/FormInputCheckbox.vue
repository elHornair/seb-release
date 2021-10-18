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
        :value="modelValue"
        type="checkbox"
        class="h-4 w-4 text-indigo-600 border-gray-300 rounded"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
      <label
        :for="name"
        class="ml-3 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
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
  },
  emits: ["update:modelValue"],
};
</script>
