<template>
  <form class="panel" @submit.prevent="handleFormSubmit">
    <div class="space-y-6 sm:space-y-5">
      <form-input-text
        v-model="formState.name"
        label="Name"
        name="name"
        :required="true"
        :min-length="3"
        :max-length="255"
        class="form_row"
      ></form-input-text>
      <form-input-text
        v-model="formState.urlSuffix"
        label="URL Suffix"
        name="url-suffix"
        :min-length="3"
        :max-length="45"
        class="form_row"
      ></form-input-text>
      <form-input-checkbox
        v-model="formState.active"
        name="active"
        label="Active"
        description="Status"
        :disabled="true"
        class="form_row"
      ></form-input-checkbox>
      <form-input-file
        label="Cover photo"
        name="cover-photo"
        class="form_row"
      ></form-input-file>
    </div>
    <div class="flex justify-end pt-5">
      <action-button
        label="Cancel"
        type="reset"
        :primary="false"
        @click.prevent="handleFormCancel"
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
import { reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { equals } from "rambdax";
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
  props: {
    existingInstitution: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: null,
          name: null,
          urlSuffix: null,
          active: false,
        };
      },
    },
  },
  emits: ["submit"],
  setup(props, context) {
    const router = useRouter();
    const formState = reactive({});

    const handleFormCancel = () => {
      if (
        !equals(formState, props.existingInstitution) &&
        !confirm(
          `Your form contains unsaved changes. You will lose your changes if you continue. Do you want to continue?`
        )
      ) {
        return;
      }

      router.push({
        name: "institutions",
      });
    };

    const handleFormSubmit = () => context.emit("submit", formState);

    watchEffect(() => {
      Object.assign(formState, props.existingInstitution);
    });

    return {
      handleFormSubmit,
      handleFormCancel,
      formState,
    };
  },
};
</script>

<style lang="scss" scoped>
.form_row {
  @apply sm:grid;
  @apply sm:grid-cols-3;
  @apply sm:gap-4;
  @apply sm:items-start;
  @apply sm:border-b;
  @apply sm:border-gray-200;
  @apply sm:pb-5;
}
</style>
