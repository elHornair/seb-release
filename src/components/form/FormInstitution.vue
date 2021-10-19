<template>
  <form class="form" @submit.prevent="handleFormSubmit">
    <div class="space-y-6 sm:space-y-5">
      <form-input-text
        v-model="name"
        label="Name"
        name="name"
        :required="true"
        :min-length="3"
        :max-length="255"
        class="form__row"
      ></form-input-text>
      <form-input-text
        v-model="urlSuffix"
        label="URL Suffix"
        name="url-suffix"
        :min-length="3"
        :max-length="45"
        class="form__row"
      ></form-input-text>
      <form-input-checkbox
        v-model="active"
        name="active"
        label="Active"
        description="Status"
        :disabled="true"
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
        @click.prevent="handleFormReset"
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
import { computed, ref, watchEffect } from "vue";

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
  setup(props) {
    const { createInstitution, updateInstitution } = useAPI();

    const isExistingInstitution = computed(
      () => props.existingInstitution !== null && props.existingInstitution.id
    );

    const id = ref();
    const name = ref();
    const urlSuffix = ref();
    const active = ref();

    const setFormDataToInitialValue = () => {
      id.value = props.existingInstitution.id;
      name.value = props.existingInstitution.name;
      urlSuffix.value = props.existingInstitution.urlSuffix;
      active.value = props.existingInstitution.active;
    };

    watchEffect(() => {
      setFormDataToInitialValue();
    });

    return {
      createInstitution,
      updateInstitution,
      setFormDataToInitialValue,
      isExistingInstitution,
      id,
      name,
      urlSuffix,
      active,
    };
  },
  methods: {
    handleFormReset() {
      this.setFormDataToInitialValue();
    },
    async handleFormSubmit() {
      try {
        const response = this.isExistingInstitution
          ? await this.updateInstitution(this.id, this.name, this.urlSuffix)
          : await this.createInstitution(this.name, this.urlSuffix);

        // TODO: use the received id to redirect to the newly created institutions detail page
        console.log("institution created/updated");
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
