<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-5"
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
        class="
          block
          w-full
          mt-1
          shadow-sm
          border-gray-300
          rounded-md
          sm:mt-3 sm:text-sm
        "
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
