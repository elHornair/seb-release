<template>
  <div>
    <label
      :for="name"
      class="block text-sm font-medium text-gray-700 sm:mt-0 sm:pt-1.5"
    >
      {{ label }}
    </label>
    <div class="mt-1 sm:mt-0 sm:col-span-2">
      <div
        class="
          flex
          justify-center
          px-6
          pt-5
          pb-6
          border-2 border-gray-300 border-dashed
          rounded-sm
        "
      >
        <div class="space-y-1 text-center">
          <upload-icon class="mx-auto h-8 w-8 text-gray-400"></upload-icon>
          <div class="flex text-sm text-gray-600">
            <label
              :for="name"
              class="
                relative
                cursor-pointer
                font-medium
                text-primary-600
                hover:text-primary-500
              "
            >
              <span>Upload a file</span>
              <input :id="name" :name="name" type="file" class="sr-only" />
            </label>
            <p class="pl-1" aria-hidden="true">or drag and drop</p>
          </div>
          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: really implement this => figure out, how the API wants to receive binary file information
import { UploadIcon } from "@heroicons/vue/solid";
export default {
  name: "FormInputFile",
  components: { UploadIcon },
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

<style scoped></style>
