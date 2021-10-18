<template>
  <view-basic>
    <form
      class="form"
      action="#"
      method="POST"
      @submit.prevent="handleFormSubmit"
    >
      <div class="space-y-6 sm:space-y-5">
        <form-input-text
          label="Name"
          name="name"
          class="form__row"
        ></form-input-text>
        <form-input-text
          label="URL Suffix"
          name="url-suffix"
          class="form__row"
        ></form-input-text>
        <form-input-checkbox
          name="active"
          label="Active"
          description="Status"
          class="form__row"
        ></form-input-checkbox>
        <form-input-file
          label="Cover photo"
          name="cover-photo"
          class="form__row"
        ></form-input-file>
      </div>
      <div class="flex justify-end pt-5">
        <action-button
          label="Reset"
          type="reset"
          :primary="false"
        ></action-button>
        <action-button
          label="Save"
          type="submit"
          :primary="true"
          class="ml-3"
        ></action-button>
      </div>
    </form>
  </view-basic>
</template>

<script>
import ViewBasic from "@/components/layout/ViewBasic";
import FormInputText from "@/components/form/FormInputText";
import FormInputFile from "@/components/form/FormInputFile";
import ActionButton from "@/components/misc/ActionButton";
import FormInputCheckbox from "@/components/form/FormInputCheckbox";

export default {
  name: "InstitutionCreate",
  components: {
    FormInputCheckbox,
    ViewBasic,
    FormInputText,
    FormInputFile,
    ActionButton,
  },
  methods: {
    async handleFormSubmit() {
      // TODO: use api
      console.log("create institution submit triggered");
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  @apply bg-white;
  @apply px-4;
  @apply py-5;
  @apply shadow;
  @apply sm:rounded-lg;
  @apply sm:px-6;
}

.form__row {
  @apply sm:grid;
  @apply sm:grid-cols-3;
  @apply sm:gap-4;
  @apply sm:items-start;
  @apply sm:border-b;
  @apply sm:border-gray-200;
  @apply sm:pb-5;
}
</style>
