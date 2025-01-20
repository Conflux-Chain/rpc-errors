import type { BaseError } from "./baseError";

export interface ErrorClassType {
  new (message: string, data: string): BaseError;
  parseError(message: string, data: string): boolean;
}

export type RegisterErrorsType = {
  [errorCode: number]: {
    code: number;
    baseError: ErrorClassType;
    detailErrors: ErrorClassType[];
  };
};
