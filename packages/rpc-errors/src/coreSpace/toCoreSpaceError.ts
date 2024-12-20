import { BaseError } from "../shared/baseError";
import { RpcErrorResponse } from "../utils/request";
import { InvalidParams } from "./invalidParams";

export type toCoreSpaceErrorParamsType = RpcErrorResponse["error"];
export type toCoreSpaceErrorReturnType = BaseError | InvalidParams;

export function toCoreSpaceError(
  error: toCoreSpaceErrorParamsType
): toCoreSpaceErrorReturnType {
  if (error.code === InvalidParams.code) {
    return new InvalidParams(error.message, error.data);
  }

  return new BaseError(error.code, error.message);
}
