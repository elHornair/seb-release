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
      <form-input-radio
        v-model="state.active"
        label="Status"
        name="status"
        :options="[
          { label: 'All', value: STATUS_FILTER_OPTIONS.ALL },
          { label: 'Only Active', value: STATUS_FILTER_OPTIONS.ACTIVE },
          { label: 'Only Inactive', value: STATUS_FILTER_OPTIONS.INACTIVE },
        ]"
        class="form__row"
      >
      </form-input-radio>
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
import FormInputRadio from "@/components/form/FormInputRadio";

export default {
  name: "Filters",
  components: {
    FormInputRadio,
    FormInputText,
    ActionButton,
  },
  setup() {
    const { filteringState, setFilters } = useFiltering();

    const STATUS_FILTER_OPTIONS = {
      ALL: "ALL",
      ACTIVE: "ACTIVE",
      INACTIVE: "INACTIVE",
    };

    const state = reactive({
      name: null,
      urlSuffix: null,
      active: STATUS_FILTER_OPTIONS.ALL,
    });

    const statusFilterToString = (statusFilter) => {
      if (statusFilter === null) {
        return STATUS_FILTER_OPTIONS.ALL;
      }

      return statusFilter
        ? STATUS_FILTER_OPTIONS.ACTIVE
        : STATUS_FILTER_OPTIONS.INACTIVE;
    };

    const stringToStatusFilter = (str) => {
      if (str === STATUS_FILTER_OPTIONS.ALL) {
        return null;
      }

      return str === STATUS_FILTER_OPTIONS.ACTIVE;
    };

    const setFormDataToInitialValue = () => {
      Object.assign(state, filteringState, {
        active: statusFilterToString(filteringState.active),
      });
    };

    setFormDataToInitialValue();

    const handleResetClick = () => {
      setFormDataToInitialValue();
    };

    const handleFormSubmit = () => {
      setFilters(
        Object.assign({}, state, {
          active: stringToStatusFilter(state.active),
        })
      );
    };

    return {
      STATUS_FILTER_OPTIONS,
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
