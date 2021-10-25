<template>
  <button @click="active ? handleDeactivateClick() : handleActivateClick()">
    <span class="sr-only">{{ label }}</span>
    <span aria-hidden="true">
      <RefreshIcon class="h-5 w-5"></RefreshIcon>
    </span>
  </button>
</template>

<script>
import { RefreshIcon } from "@heroicons/vue/solid";
import { useAPI } from "@/composables/useAPI";

export default {
  name: "ToggleInstitutionStatusAction",
  components: { RefreshIcon },
  props: {
    id: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
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
