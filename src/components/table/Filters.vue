<template>
  <form @submit.prevent="handleFormSubmit">
    <div class="space-y-6 sm:space-y-5">
      <form-input-text
        v-model="state.name"
        label="Name"
        name="name"
        class="form__row"
      ></form-input-text>
      <form-input-text
        v-model="state.urlSuffix"
        label="URL Suffix"
        name="url-suffix"
        class="form__row"
      ></form-input-text>
      <!-- TODO: add radiobuttons for status here-->
    </div>
    <div class="flex justify-end pt-5">
      <action-button
        label="Reset"
        type="reset"
        :primary="false"
        @click.prevent="handleResetClick"
      ></action-button>
      <action-button
        label="Apply"
        type="submit"
        :primary="true"
        class="ml-3"
      ></action-button>
    </div>
  </form>
</template>

<script>
import FormInputText from "@/components/form/FormInputText";
import ActionButton from "@/components/misc/ActionButton";
import { useFiltering } from "@/composables/useFiltering";
import { reactive } from "vue";

export default {
  name: "Filters",
  components: {
    FormInputText,
    ActionButton,
  },
  setup() {
    const { filteringState, setFilters } = useFiltering();

    const state = reactive({
      name: null,
      urlSuffix: null,
      active: null,
    });

    const setFormDataToInitialValue = () => {
      Object.assign(state, filteringState);
    };

    setFormDataToInitialValue();

    const handleResetClick = () => {
      setFormDataToInitialValue();
    };

    const handleFormSubmit = () => {
      setFilters(state);
    };

    return {
      handleAbortClick,
      handleFormSubmit,
      name,
      state,
      handleResetClick,
      handleFormSubmit,
    };
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
