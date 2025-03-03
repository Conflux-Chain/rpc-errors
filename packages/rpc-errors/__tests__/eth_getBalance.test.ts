import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import {
  assertRpcError,
  getFreePorts,
  TEST_HEX_ADDRESS,
  TEST_PK,
} from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";

import { eSpaceErrors, RPCError } from "../src";
import { InvalidParamsError, MissingHexPrefixError } from "../src/eSpace";
import {
  EmptyBlockStringError,
  InvalidBlockTypeError,
  InvalidDigitError,
  SpecifiedBlockNotExecutedError,
} from "../src/eSpace/invalidParamsErrors";

const rpcError = new RPCError();
rpcError.registerError(eSpaceErrors);

let HTTP_PORT: number;

beforeAll(async () => {
  const [jsonrpcHttpPort, udpAndTcpPort] = await getFreePorts(2);
  HTTP_PORT = jsonrpcHttpPort as number;
  const server = await createServer({
    tcpPort: udpAndTcpPort,
    udpPort: udpAndTcpPort,
    jsonrpcHttpEthPort: jsonrpcHttpPort,
    genesisSecrets: [TEST_PK],
  });

  await server.start();

  return async () => await server.stop();
});

describe("eth_getBalance", () => {
  test("invalid params(invalid hex string without 0x prefix)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_getBalance", [
      TEST_HEX_ADDRESS,
      "1",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(MissingHexPrefixError);
    expect(parsedError.name).toBe("MissingHexPrefix");
    expect(parsedError.code).toBe(MissingHexPrefixError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
  test("invalid params(pass number)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_getBalance", [
      TEST_HEX_ADDRESS,
      1,
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);

    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(InvalidBlockTypeError);
    expect(parsedError.name).toBe("InvalidBlockType");
    expect(parsedError.code).toBe(InvalidBlockTypeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
  test("invalid params(query epoch number greater than actual epoch number.)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_getBalance", [
      TEST_HEX_ADDRESS,
      `0x${Number.MAX_SAFE_INTEGER.toString(16)}`,
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(SpecifiedBlockNotExecutedError);
    expect(parsedError.name).toBe("SpecifiedBlockNotExecuted");
    expect(parsedError.code).toBe(SpecifiedBlockNotExecutedError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid params(empty hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_getBalance", [
      TEST_HEX_ADDRESS,
      "0x",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(EmptyBlockStringError);
    expect(parsedError.name).toBe("EmptyBlockString");
    expect(parsedError.code).toBe(EmptyBlockStringError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid params(invalid hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_getBalance", [
      TEST_HEX_ADDRESS,
      "0xinvalid",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(InvalidDigitError);
    expect(parsedError.name).toBe("InvalidDigitBlock");
    expect(parsedError.code).toBe(InvalidDigitError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
