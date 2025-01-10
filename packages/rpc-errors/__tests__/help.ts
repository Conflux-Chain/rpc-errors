import net from "node:net";
import { RpcErrorResponse, RpcResponse } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";

export const TEST_ADDRESS = "net1234:aate4wu8uxuwschzdkzr4zz22tkbsbd446ca7v1vub"


export async function getPort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const AddressInfo = srv.address();

      if (typeof AddressInfo === "object") {
        if (typeof AddressInfo?.port === "number") {
          return srv.close(() => resolve(AddressInfo?.port));
        }
      }
      srv.close(() => reject("get port error"));
    });
  });
}

/**
 * Get three free ports
 * @returns Promise<[number, number, number]>
 */
export async function getFreePorts(size = 3) {
  return Promise.all(Array.from({ length: size }).map(() => getPort()));
}

export function assertRpcError(
  response: RpcResponse
): asserts response is RpcErrorResponse {
  if (!isRpcError(response)) {
    throw new Error("Expected RPC error response");
  }
}

export function createErrorResponse(error: {
  code: number;
  message: string;
  data?: any;
}): RpcErrorResponse {
  return {
    jsonrpc: "2.0",
    id: Math.random() * 100,
    error: error,
  };
}
