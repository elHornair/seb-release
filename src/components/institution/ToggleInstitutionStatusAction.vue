<template>
  <button
    v-if="iconOnly"
    @click="active ? handleDeactivateClick() : handleActivateClick()"
  >
    <span class="sr-only">{{ label }}</span>
    <span aria-hidden="true">
      <component :is="icon" class="h-5 w-5"></component>
    </span>
  </button>
  <action-button
    v-else
    type="button"
    :label="label"
    :primary="false"
    :full="true"
    @click="active ? handleDeactivateClick() : handleActivateClick()"
  >
    <template #icon>
      <component
        :is="icon"
        class="-ml-1 mr-2 h-5 w-5 text-gray-700"
      ></component>
    </template>
  </action-button>
</template>

<script>
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/vue/solid";
import { useAPI } from "@/composables/useAPI";
import ActionButton from "@/components/misc/ActionButton";

export default {
  name: "ToggleInstitutionStatusAction",
  components: { ActionButton, StatusOnlineIcon, StatusOfflineIcon },
  props: {
    id: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    iconOnly: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["institution:change"],
  setup() {
    const {
      getInstitutionDependencies,
      activateInstitution,
      deactivateInstitution,
    } = useAPI();

    return {
      getInstitutionDependencies,
      activateInstitution,
      deactivateInstitution,
    };
  },
  computed: {
    label() {
      return this.active ? "Deactivate" : "Activate";
    },
    icon() {
      return this.active ? "StatusOfflineIcon" : "StatusOnlineIcon";
    },
  },
  methods: {
    async checkDependencies() {
      const dependencies = await this.getInstitutionDependencies(this.id);

      if (!dependencies || dependencies.length < 1) {
        return true;
      }

      return confirm(
        `Note that ${dependencies.length} entities belong to this institution. Are that you want to deactivate this institution?`
      );
    },
    async handleActivateClick() {
      this.processToggleResult(await this.activateInstitution(this.id));
    },
    async handleDeactivateClick() {
      if (!(await this.checkDependencies())) {
        return false;
      }

      this.processToggleResult(await this.deactivateInstitution(this.id));
    },
    processToggleResult(res) {
      if (res.errors.length > 0) {
        alert(
          "There was an error while updating the active status of this institution."
        );
        console.error(res);
      }

      this.$emit("institution:change", {
        id: this.id,
      });
    },
  },
};
</script>
