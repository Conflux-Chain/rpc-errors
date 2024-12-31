import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";
import { toCoreSpaceError } from "../src/coreSpace/toCoreSpaceError";
import { InvalidParamsError } from "../src/coreSpace/invalidParams/invalidParams";

let HTTP_PORT: number;
beforeAll(async () => {
  const [jsonrpcHttpPort, udpAndTcpPort] = await getFreePorts(2);
  HTTP_PORT = jsonrpcHttpPort as number;
  const server = await createServer({
    tcpPort: udpAndTcpPort,
    udpPort: udpAndTcpPort,
    jsonrpcHttpPort: jsonrpcHttpPort,
  });

  await server.start();

  return async () => await server.stop();
});

describe("cfx_getBlockByEpochNumber errors", async () => {

  test("invalid params(query epoch number greater than actual epoch number.)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getBlockByEpochNumber", [
      `0x${Number.MAX_VALUE.toString(16)}`,
    ]);

    const errorCode = -32602;
    const errorMessage =
      "Invalid params: Invalid epoch number: number too large to fit in target type.";
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(errorCode);
    expect(error.error.message).toBe(errorMessage);

    const error1 = toCoreSpaceError(error.error);
    expect(error1).toBeInstanceOf(InvalidParamsError);
    expect(error1.code).toBe(errorCode);
    expect(error1.message).toBe(errorMessage);
  });

  test("invalid params(empty hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getBlockByEpochNumber", ["0x"]);
    const errorCode = -32602;
    const errorMessage =
      "Invalid params: Invalid epoch number: cannot parse integer from empty string.";

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(errorCode);
    expect(error.error.message).toBe(errorMessage);

    const error1 = toCoreSpaceError(error.error);
    expect(error1).toBeInstanceOf(InvalidParamsError);
    expect(error1.code).toBe(errorCode);
    expect(error1.message).toBe(errorMessage);
  });

  test("invalid params(invalid hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getBlockByEpochNumber", ["0xinvalid"]);

    const errorCode = -32602;
    const errorMessage =
      "Invalid params: Invalid epoch number: invalid digit found in string.";
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(errorCode);
    expect(error.error.message).toBe(errorMessage);

    const error1 = toCoreSpaceError(error.error);
    expect(error1).toBeInstanceOf(InvalidParamsError);
    expect(error1.code).toBe(errorCode);
    expect(error1.message).toBe(errorMessage);
  });

  test("invalid params(invalid hex string without 0x prefix)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getBlockByEpochNumber", ["1"]);
    const errorCode = -32602;
    const errorMessage =
      "Invalid params: Invalid epoch number: missing 0x prefix.";
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(errorCode);
    expect(error.error.message).toBe(errorMessage);

    const error1 = toCoreSpaceError(error.error);
    expect(error1).toBeInstanceOf(InvalidParamsError);
    expect(error1.code).toBe(errorCode);
    expect(error1.message).toBe(errorMessage);
  });
});
