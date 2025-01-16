import { RegisterErrorsType } from "../../types";
import { NodeCatchUpError } from "./nodeCatchUp";

const CustomErrors: RegisterErrorsType = {
  [NodeCatchUpError.code]: {
    code: NodeCatchUpError.code,
    baseError: NodeCatchUpError,
    detailErrors: [],
  },
};

export default CustomErrors;
