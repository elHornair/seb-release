import { useAPI } from "@/composables/useAPI";

const {
  getInstitutionDependencies,
  activateInstitution,
  deactivateInstitution,
} = useAPI();

const checkDependencies = async (id) => {
  const dependencies = await getInstitutionDependencies(id);

  if (!dependencies || dependencies.length < 1) {
    return true;
  }

  return confirm(
    `Note that ${dependencies.length} entities belong to this institution. Are that you want to deactivate this institution?`
  );
};

const processToggleResult = (res) => {
  if (res.errors.length > 0) {
    alert(
      "There was an error while updating the active status of this institution."
    );
    console.error(res);
    return false;
  }

  return true;
};

const handleActivateRequest = async (id) => {
  return processToggleResult(await activateInstitution(id));
};

const handleDeactivateRequest = async (id) => {
  if (!(await checkDependencies(id))) {
    return false;
  }

  return processToggleResult(await deactivateInstitution(id));
};

export const useInstitutionStatusToggling = () => {
  return {
    handleActivateRequest,
    handleDeactivateRequest,
  };
};
