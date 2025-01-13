import { RegisterErrorsType } from "../../types";
import { NodeCatchUpError } from "./nodeCatchUp";

const CustomErrors: RegisterErrorsType = {
  codeMap: [{ code: NodeCatchUpError.code, error: NodeCatchUpError }],
  messageMap: [],
};

export default CustomErrors;
