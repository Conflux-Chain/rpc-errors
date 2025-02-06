import { InvalidParamsError } from "./invalidParams";

export type MissingFilterParametersErrorType = {
  name: "MissingFilterParameters";
} & MissingFilterParametersError;

export class MissingFilterParametersError extends InvalidParamsError {
  override name = "MissingFilterParameters";
  static pattern =
    /Filter must provide one of the following: \(1\) an epoch range through `fromEpoch` and `toEpoch`, \(2\) a block number range through `fromBlock` and `toBlock`, \(3\) a set of block hashes through `blockHashes`/;
  static override parseError(message: string): boolean {
    return MissingFilterParametersError.pattern.test(message);
  }
}

export class ExceededLogsLimitError extends InvalidParamsError {
  override name = "ExceededLogsLimit";
  static pattern =
    /This query results in too many logs, max limitation is (\d+), please filter results by a smaller epoch\/block range/;

  static override parseError(message: string): boolean {
    return ExceededLogsLimitError.pattern.test(message);
  }
}
