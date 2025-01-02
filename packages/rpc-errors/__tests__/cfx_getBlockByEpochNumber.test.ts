import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";
import { InvalidParamsError } from "../src/coreSpace/invalidParams/invalidParams";
import { coreSpaceErrors, RPCError } from "../src";
import {
  EmptyEpochStringError,
  EpochNumberPosOverflowError,
  EpochNumberTooLargeError,
  InvalidDigitEpochError,
  MissingHexPrefixError,
} from "../src/coreSpace/invalidParams/epoch";

let HTTP_PORT: number;
const rpcError = new RPCError();
rpcError.registerError(coreSpaceErrors);
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
    const error = await request<string>("cfx_epochNumber", [
      `0x${Number.MAX_SAFE_INTEGER.toString(16)}`,
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(EpochNumberTooLargeError);
    expect(parsedError.name).toBe("EpochNumberTooLarge");
    expect(parsedError.code).toBe(EpochNumberTooLargeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid params(empty hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getBlockByEpochNumber", ["0x"]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(EmptyEpochStringError);
    expect(parsedError.name).toBe("EmptyEpochString");
    expect(parsedError.code).toBe(EmptyEpochStringError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid params(invalid hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getBlockByEpochNumber", [
      "0xinvalid",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(InvalidDigitEpochError);
    expect(parsedError.name).toBe("InvalidDigitEpoch");
    expect(parsedError.code).toBe(InvalidDigitEpochError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid params(invalid hex string without 0x prefix)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getBlockByEpochNumber", ["1"]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(MissingHexPrefixError);
    expect(parsedError.name).toBe("MissingHexPrefix");
    expect(parsedError.code).toBe(MissingHexPrefixError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
