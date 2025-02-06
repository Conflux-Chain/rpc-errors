import { InvalidParamsError } from "./invalidParams";

export type ExceededTopicsLimitErrorType = {
  name: "ExceededTopicsLimit";
} & ExceededTopicsLimitError;

export class ExceededTopicsLimitError extends InvalidParamsError {
  override name = "ExceededTopicsLimit";
  static pattern =
    /filter\.topics can contain up to (\d+) topics; (\d+) were provided/;
  static override parseError(message: string): boolean {
    return ExceededTopicsLimitError.pattern.test(message);
  }
}
