import { BaseError } from "./baseError";
import { ErrorClassType, RegisterErrorsType } from "./types";
import { RpcErrorResponse } from "./utils/request";

export class RPCError {
  errorCodeMap = new Map<number, ErrorClassType>([]);
  messagePatterns = new Map<number, ErrorClassType[]>([]);

  parse(rpcError: RpcErrorResponse["error"]): BaseError {
    // get the base error by error code
    const ErrorClass = this.errorCodeMap.get(rpcError.code);
    if (!ErrorClass) {
      return new BaseError(rpcError.code, rpcError.message);
    }
    // let's try to get the error by error message(it is more detailed than error code)

    const detailErrors = this.messagePatterns.get(rpcError.code);
    if (detailErrors) {
      for (const DetailErrorClass of detailErrors) {
        if (DetailErrorClass.parseError(rpcError.message, rpcError.data)) {
          const Error = new DetailErrorClass(rpcError.message, rpcError.data);
          // check the detail error code
          if (rpcError.code === Error.code) {
            return Error;
          }
        }
      }
    }

    return new ErrorClass(rpcError.message, rpcError.data);
  }

  registerErrorCode(code: number, ErrorClass: ErrorClassType) {
    this.errorCodeMap.set(code, ErrorClass);
  }

  registerMessagePattern(code: number, ErrorClass: ErrorClassType[]) {
    this.messagePatterns.set(code, ErrorClass);
  }

  registerError(registerErrors: RegisterErrorsType | RegisterErrorsType[]) {
    const newRegisterErrors = Array.isArray(registerErrors)
      ? registerErrors
      : [registerErrors];

      
    for (const registerError of newRegisterErrors) {
      Object.entries(registerError).forEach(([_, error]) => {
        this.registerErrorCode(error.code, error.baseError);

        if (this.messagePatterns.has(error.code)) {
          this.messagePatterns.get(error.code)?.push(...error.detailErrors);
        } else {
          this.messagePatterns.set(error.code, error.detailErrors);
        }
      });
    }
  }
}
