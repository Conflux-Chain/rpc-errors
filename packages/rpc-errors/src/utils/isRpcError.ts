import type { RpcErrorResponse, RpcResponse } from "./request";

export function isRpcError(
  response: RpcResponse
): response is RpcErrorResponse {
  return "error" in response;
}
