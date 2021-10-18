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
        type="text"
        :name="name"
        autocomplete="off"
        class="
          block
          w-full
          shadow-sm
          focus:ring-indigo-500 focus:border-indigo-500
          sm:text-sm
          border-gray-300
          rounded-md
        "
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
  },
};
</script>
