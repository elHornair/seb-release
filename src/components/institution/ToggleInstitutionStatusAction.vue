<template>
  <action-button
    type="button"
    :label="label"
    :primary="false"
    :full="true"
    @click="active ? handleDeactivateClick(id) : handleActivateClick(id)"
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
import { useInstitutionStatusToggling } from "@/composables/useInstitutionStatusToggling";
import ActionButton from "@/components/misc/ActionButton";
import { computed } from "vue";

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
  },
  emits: ["institution:change"],
  setup(props, context) {
    const { handleActivateRequest, handleDeactivateRequest } =
      useInstitutionStatusToggling();

    const label = computed(() => (props.active ? "Deactivate" : "Activate"));
    const icon = computed(() =>
      props.active ? "StatusOfflineIcon" : "StatusOnlineIcon"
    );

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
      icon,
    };
  },
};
</script>
