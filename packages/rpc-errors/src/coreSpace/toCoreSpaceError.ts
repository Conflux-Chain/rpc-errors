import { BaseError } from "../shared/baseError";
import { RpcErrorResponse } from "../utils/request";
import { InvalidParamsError } from "./invalidParams/invalidParams";

export type toCoreSpaceErrorParamsType = RpcErrorResponse["error"];
export type toCoreSpaceErrorReturnType = BaseError | InvalidParamsError;

export function toCoreSpaceError(
  error: toCoreSpaceErrorParamsType
): toCoreSpaceErrorReturnType {
  if (error.code === InvalidParamsError.code) {
    return new InvalidParamsError(error.message, error.data);
  }

  return new BaseError(error.code, error.message);
}
