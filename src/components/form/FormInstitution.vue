<template>
  <form
    class="form"
    action="#"
    method="POST"
    @submit.prevent="handleFormSubmit"
  >
    <div class="space-y-6 sm:space-y-5">
      <form-input-text
        v-model="name"
        label="Name"
        name="name"
        class="form__row"
      ></form-input-text>
      <form-input-text
        v-model="urlSuffix"
        label="URL Suffix"
        name="url-suffix"
        class="form__row"
      ></form-input-text>
      <form-input-checkbox
        v-model="active"
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
</template>

<script>
import { useAPI } from "@/composables/useAPI";
import FormInputCheckbox from "@/components/form/FormInputCheckbox";
import FormInputText from "@/components/form/FormInputText";
import FormInputFile from "@/components/form/FormInputFile";
import ActionButton from "@/components/misc/ActionButton";

export default {
  name: "FormInstitution",
  components: {
    FormInputCheckbox,
    FormInputText,
    FormInputFile,
    ActionButton,
  },
  setup() {
    const { createInstitution } = useAPI();

    return {
      createInstitution,
    };
  },
  data() {
    return {
      name: null,
      urlSuffix: null,
      active: false,
    };
  },
  methods: {
    async handleFormSubmit() {
      // TODO: form validation (name: required && 3-255 zeichen; urlSuffix: 3 bis 45 zeichen)

      try {
        const response = await this.createInstitution(
          this.name,
          this.urlSuffix,
          this.active
        );

        // TODO: use the received id to redirect to the newly created institutions detail page
        console.log("institution created");
        console.log(response);

        this.$router.push({ name: "institutions" });
      } catch (error) {
        // TODO: show error message and properly style it
      }
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
