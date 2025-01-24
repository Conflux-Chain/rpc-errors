import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";

import { coreSpaceErrors, RPCError } from "../src";
import {
  FilterNotFoundError,
  InvalidRequestError,
} from "../src/coreSpace/JSONRPC/invalidRequest";

const rpcError = new RPCError();
rpcError.registerError(coreSpaceErrors);

let HTTP_PORT: number;

beforeAll(async () => {
  const [jsonrpcHttpPort, udpAndTcpPort] = await getFreePorts(2);
  HTTP_PORT = jsonrpcHttpPort as number;
  const server = await createServer({
    tcpPort: udpAndTcpPort,
    udpPort: udpAndTcpPort,
    jsonrpcHttpPort: jsonrpcHttpPort,
    pollLifetimeInSeconds: 100,
  });

  await server.start();

  return async () => await server.stop();
});

describe("cfx_getFilterLogs errors", async () => {
  test("FilterNotFound", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getFilterLogs", [
      "0x09294f7b3b63b52d3771fcafb7b7ed61",
    ]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidRequestError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(FilterNotFoundError);
    expect(parsedError.name).toBe("FilterNotFound");
    expect(parsedError.code).toBe(FilterNotFoundError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
