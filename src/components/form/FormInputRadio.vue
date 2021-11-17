<template>
  <div role="group" :aria-labelledby="`label-${name}`">
    <div
      :id="`label-${name}`"
      class="block text-sm font-medium text-gray-700 sm:mt-0 sm:pt-0"
    >
      {{ label }}
    </div>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div class="max-w-lg">
        <div class="space-y-1">
          <div
            v-for="option in options"
            :key="option.value"
            class="flex items-center"
          >
            <input
              :id="`${name}_option-${option.value}`"
              :name="`${name}`"
              type="radio"
              class="h-4 w-4 text-primary-600 border-gray-300"
              :value="option.value"
              :checked="modelValue === option.value"
              @change="$emit('update:modelValue', $event.target.value)"
            />
            <label
              :for="`${name}_option-${option.value}`"
              class="ml-3 block text-sm font-medium text-gray-700"
            >
              {{ option.label }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormInputRadio",
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
    options: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:modelValue"],
};
</script>
