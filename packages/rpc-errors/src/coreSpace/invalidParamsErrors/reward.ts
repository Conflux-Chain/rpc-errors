import { InvalidParamsError } from "./invalidParams";

export type RewardNotCalculatedErrorType = RewardNotCalculatedError & {
  name: "RewardNotCalculated";
};
export class RewardNotCalculatedError extends InvalidParamsError {
  override name = "RewardNotCalculated";
  static pattern = /Reward not calculated yet/;

  static override parseError(message: string, data = ""): boolean {
    return RewardNotCalculatedError.pattern.test(data);
  }
}
