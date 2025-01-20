import type { RegisterErrorsType } from "../../types";
import { NonExistentBlockHeaderError } from "./fee";
import { InternalError } from "./Internal";

const InternalErrors: RegisterErrorsType = {
  [InternalError.code]: {
    code: InternalError.code,
    baseError: InternalError,
    detailErrors: [NonExistentBlockHeaderError],
  },
};

export default InternalErrors;
