import { RegisterErrorsType } from "../../types";
import { NonExistentBlockHeaderError } from "./fee";
import { InternalError } from "./Internal";

const InternalErrors: RegisterErrorsType = {
  codeMap: [{ code: InternalError.code, error: InternalError }],
  messageMap: [
    {
      pattern: NonExistentBlockHeaderError.pattern,
      error: NonExistentBlockHeaderError,
    },
  ],
};

export default InternalErrors;
