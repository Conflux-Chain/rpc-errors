import { BaseError } from "../../baseError";

export type NodeCatchUpErrorType = NodeCatchUpError & {
  name: "InternalError";
};

/**
 *  When the node is still in catch up mode, it is not capable to handle certain requests. We will return this code in this situation.
 */
export class NodeCatchUpError extends BaseError {
  static override code = -32077;
  override readonly code = -32077;
  override name = "InternalError";
  constructor(message: string, public readonly data?: any) {
    super(-32077, message);
  }

  static parseError(message: string, data?: any): boolean {
    return true;
  }
}
