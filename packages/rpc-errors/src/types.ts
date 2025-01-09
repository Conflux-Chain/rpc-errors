import { BaseError } from "./baseError";

export type RegisterErrorsType = {
    codeMap: { code: number; error: new (...args: any[]) => BaseError }[];
    messageMap: {
      pattern: RegExp;
      error: new (...args: any[]) => BaseError;
    }[];
  };