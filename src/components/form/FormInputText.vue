<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
    >
      {{ label }}
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <input
        :id="name"
        :name="name"
        :value="modelValue"
        type="text"
        autocomplete="off"
        class="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
    },
  },
  emits: ["update:modelValue"],
};
</script>
