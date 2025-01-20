import type { BaseError } from "./baseError";

export interface ErrorClassType {
  new (message: string, data?: any): BaseError;
  parseError(message: string, data?: any): boolean;
}

export type RegisterErrorsType = {
  [errorCode: number]: {
    code: number;
    baseError: ErrorClassType;
    detailErrors: ErrorClassType[];
  };
};
