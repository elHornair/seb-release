<template>
  <Modal :on-close="handleClose">
    <template #header>
      <h2 class="px-3">Filters</h2>
    </template>
    <template #body>
      <form
        class="h-full overflow-hidden relative"
        @submit.prevent="handleFormSubmit"
      >
        <div class="absolute inset-0 overflow-y-auto px-3">
          <div class="space-y-6 sm:space-y-5">
            <form-input-text
              v-model="state.name"
              :label="getFieldLabel('name')"
              name="name"
              class="form__row"
            ></form-input-text>
            <form-input-text
              v-model="state.urlSuffix"
              :label="getFieldLabel('urlSuffix')"
              name="url-suffix"
              class="form__row"
            ></form-input-text>
            <form-input-radio
              v-model="state.active"
              :label="getFieldLabel('active')"
              name="status"
              :options="[
                {
                  label: getFieldValue('active', null),
                  value: STATUS_FILTER_OPTIONS.ALL,
                },
                {
                  label: getFieldValue('active', true),
                  value: STATUS_FILTER_OPTIONS.ACTIVE,
                },
                {
                  label: getFieldValue('active', false),
                  value: STATUS_FILTER_OPTIONS.INACTIVE,
                },
              ]"
              class="form__row"
            >
            </form-input-radio>
          </div>
          <div class="flex justify-end pt-5">
            <action-button
              label="Abort"
              type="reset"
              :primary="false"
              @click.prevent="handleClose"
            ></action-button>
            <action-button
              label="Apply"
              type="submit"
              :primary="true"
              class="ml-3"
            ></action-button>
          </div>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal";
import FormInputText from "@/components/form/FormInputText";
import FormInputRadio from "@/components/form/FormInputRadio";
import ActionButton from "@/components/misc/ActionButton";
import { useFiltering } from "@/composables/useFiltering";
import { reactive } from "vue";

export default {
  name: "Filters",
  components: {
    Modal,
    FormInputRadio,
    FormInputText,
    ActionButton,
  },
  emits: ["hide"],
  setup(props, context) {
    const { filteringState, setFilters, getFieldLabel, getFieldValue } =
      useFiltering();

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

    const handleClose = () => context.emit("hide");

    const handleFormSubmit = () => {
      setFilters(
        Object.assign({}, state, {
          active: stringToStatusFilter(state.active),
        })
      );
      context.emit("hide");
    };

    Object.assign(state, filteringState, {
      active: statusFilterToString(filteringState.active),
    });

    return {
      STATUS_FILTER_OPTIONS,
      state,
      handleClose,
      handleFormSubmit,
      getFieldLabel,
      getFieldValue,
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
