import { BaseError } from "./baseError";
import { InvalidParamsError } from "./coreSpace/invalidParams/invalidParams";

export interface RPCError {
  code: number;
  message: string;
  data?: any;
}

const ErrorCodeMap = new Map<number, new (...args: any[]) => BaseError>([
  [InvalidParamsError.code, InvalidParamsError],
]);

export function parse(rpcError: RPCError): BaseError {
  const ErrorClass = ErrorCodeMap.get(rpcError.code);
  if (!ErrorClass) {
    return new BaseError(rpcError.code, rpcError.message);
  }

  return new ErrorClass(rpcError.message, rpcError.data);
}
