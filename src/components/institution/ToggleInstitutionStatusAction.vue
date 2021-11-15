<template>
  <action-button
    type="button"
    :label="label"
    :primary="false"
    :full="true"
    @click="active ? handleDeactivateClick(id) : handleActivateClick(id)"
  >
  </action-button>
</template>

<script>
import { useInstitutionStatusToggling } from "@/composables/institution/useInstitutionStatusToggling";
import { computed } from "vue";
import ActionButton from "@/components/misc/ActionButton";

export default {
  name: "ToggleInstitutionStatusAction",
  components: { ActionButton },
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
  emits: ["institution:change"],
  setup(props, context) {
    const { handleActivateRequest, handleDeactivateRequest } =
      useInstitutionStatusToggling();

    const label = computed(() => (props.active ? "Deactivate" : "Activate"));

    const handleActivateClick = async () => {
      if (await handleActivateRequest(props.id)) {
        context.emit("institution:change", {
          id: props.id,
        });
      }
    };

    const handleDeactivateClick = async () => {
      if (await handleDeactivateRequest(props.id)) {
        context.emit("institution:change", {
          id: props.id,
        });
      }
    };

    return {
      handleActivateClick,
      handleDeactivateClick,
      label,
    };
  },
};
</script>
