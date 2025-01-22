import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts, TEST_ADDRESS } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";
import { InvalidParamsError } from "../src/coreSpace/invalidParamsErrors/invalidParams";
import { coreSpaceErrors, RPCError } from "../src";
import {
  EmptyEpochStringError,
  EpochNumberTooLargeError,
  InvalidDigitEpochError,
  InvalidEpochTypeError,
  MissingHexPrefixError,
  SpecifiedEpochNotExecutedError,
} from "../src/coreSpace/invalidParamsErrors/epoch";
import { UnexpectedRpcAddressNetworkError } from "../src/coreSpace/invalidParamsErrors/address";

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
  });

  await server.start();

  return async () => await server.stop();
});

const waringAddr =
  "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp";

const addr = TEST_ADDRESS;
describe("cfx_getAccount errors", async () => {
  test("invalid params(pass number)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getAccount", [addr, 1]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidEpochTypeError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(InvalidEpochTypeError);
    expect(parsedError.name).toBe("InvalidEpochType");
    expect(parsedError.code).toBe(InvalidEpochTypeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
  test("invalid params(query epoch number greater than actual epoch number.)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getAccount", [
      addr,
      `0x${Number.MAX_SAFE_INTEGER.toString(16)}`,
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(SpecifiedEpochNotExecutedError);
    expect(parsedError.name).toBe("SpecifiedEpochNotExecuted");
    expect(parsedError.code).toBe(SpecifiedEpochNotExecutedError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid params(empty hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getAccount", [addr, "0x"]);

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
    const error = await request<string>("cfx_getAccount", [addr, "0xinvalid"]);

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
    const error = await request<string>("cfx_getAccount", [addr, "1"]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(MissingHexPrefixError);
    expect(parsedError.name).toBe("MissingHexPrefix");
    expect(parsedError.code).toBe(MissingHexPrefixError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("UnexpectedRpcAddressNetworkError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getAccount", [waringAddr, "0x0"]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(UnexpectedRpcAddressNetworkError);
    expect(parsedError.name).toBe("UnexpectedRpcAddressNetwork");
    expect(parsedError.code).toBe(UnexpectedRpcAddressNetworkError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
