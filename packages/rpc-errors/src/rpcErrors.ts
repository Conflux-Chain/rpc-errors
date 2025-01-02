import { BaseError } from "./baseError";
import { RpcErrorResponse } from "./utils/request";

export type RegisterErrorsType = {
  codeMap: { code: number; error: new (...args: any[]) => BaseError }[];
  messageMap: {
    pattern: RegExp;
    error: new (...args: any[]) => BaseError;
  }[];
};

export class RPCError {
  errorCodeMap = new Map<number, new (...args: any[]) => BaseError>([]);
  messagePatterns = new Map<RegExp, new (...args: any[]) => BaseError>([]);

  parse(rpcError: RpcErrorResponse["error"]): BaseError {
    // get the base error by error code
    const ErrorClass = this.errorCodeMap.get(rpcError.code);
    if (!ErrorClass) {
      return new BaseError(rpcError.code, rpcError.message);
    }
    // let's try to get the error by error message(it is more detailed than error code)
    for (const [pattern, ErrorClass] of this.messagePatterns) {
      if (pattern.test(rpcError.message)) {
        return new ErrorClass(rpcError.message, rpcError.data);
      }
    }
    return new ErrorClass(rpcError.message, rpcError.data);
  }

  registerErrorCode(
    code: number,
    ErrorClass: new (...args: any[]) => BaseError
  ) {
    this.errorCodeMap.set(code, ErrorClass);
  }

  registerMessagePattern(
    pattern: RegExp,
    ErrorClass: new (...args: any[]) => BaseError
  ) {
    this.messagePatterns.set(pattern, ErrorClass);
  }

  registerError(registerErrors: RegisterErrorsType) {
    for (const { code, error } of registerErrors.codeMap) {
      this.registerErrorCode(code, error);
    }
    for (const { pattern, error } of registerErrors.messageMap) {
      this.registerMessagePattern(pattern, error);
    }
  }
}
