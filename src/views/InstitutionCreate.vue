<template>
  <view-basic>
    <form-institution @submit="handleSubmit"></form-institution>
  </view-basic>
</template>

<script>
import ViewBasic from "@/components/layout/ViewBasic";
import FormInstitution from "@/components/form/FormInstitution";
import { useInstitutionAPI } from "@/composables/institution/useInstitutionAPI";
import { useRouter } from "vue-router";

export default {
  name: "InstitutionCreate",
  components: {
    ViewBasic,
    FormInstitution,
  },
  setup() {
    const { createInstitution } = useInstitutionAPI();
    const router = useRouter();

    const handleSubmit = async (formState) => {
      try {
        const response = await createInstitution(
          formState.name,
          formState.urlSuffix
        );

        if (!response.id) {
          throw new Error("Unexpected result from server after submit");
        }

        // TODO: maybe also show an alert on that page ("institution successfully created")
        await router.push({
          name: "institution-view",
          params: { id: response.id },
        });
      } catch (error) {
        // TODO: show error message and properly style it
      }
    };

    return {
      handleSubmit,
    };
  },
};
</script>
