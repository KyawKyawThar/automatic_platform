import { useQueryStates } from "nuqs";
import { workflowParams } from "../params";

export const useWorkFlowParams = () => {
  return useQueryStates(workflowParams);
};
