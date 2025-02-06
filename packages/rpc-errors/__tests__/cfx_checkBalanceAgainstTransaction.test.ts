import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";
import { InvalidParamsError } from "../src/coreSpace/invalidParamsErrors/invalidParams";
import { coreSpaceErrors, RPCError } from "../src";
import {
  EmptyEpochStringError,
  InvalidDigitEpochError,
  InvalidEpochTypeError,
  MissingHexPrefixError,
  SpecifiedEpochNotExecutedError,
} from "../src/coreSpace/invalidParamsErrors/epoch";
import { UnexpectedRpcAddressNetworkError } from "../src/coreSpace/invalidParamsErrors/address";
import { StorageLimitOutOfRangeError } from "../src/coreSpace/invalidParamsErrors/storage";

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

describe("cfx_checkBalanceAgainstTransaction errors", async () => {
  test("invalid params(pass number)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_checkBalanceAgainstTransaction", [
      "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
      "net1234:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaayy7c99nt",
      "0x5208",
      "0x2540be400",
      "0x0",
      1,
    ]);

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
    const error = await request<string>("cfx_checkBalanceAgainstTransaction", [
      "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
      "net1234:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaayy7c99nt",
      "0x5208",
      "0x2540be400",
      "0x0",
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
    const error = await request<string>("cfx_checkBalanceAgainstTransaction", [
      "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
      "net1234:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaayy7c99nt",
      "0x5208",
      "0x2540be400",
      "0x0",
      "0x",
    ]);

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
    const error = await request<string>("cfx_checkBalanceAgainstTransaction", [
      "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
      "net1234:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaayy7c99nt",
      "0x5208",
      "0x2540be400",
      "0x0",
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
    const error = await request<string>("cfx_checkBalanceAgainstTransaction", [
      "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
      "net1234:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaayy7c99nt",
      "0x5208",
      "0x2540be400",
      "0x0",
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

  test("UnexpectedRpcAddressNetworkError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_checkBalanceAgainstTransaction", [
      "cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
      "net1234:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaayy7c99nt",
      "0x5208",
      "0x2540be400",
      "0x0",
      "0x0",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(UnexpectedRpcAddressNetworkError);
    expect(parsedError.name).toBe("UnexpectedRpcAddressNetwork");
    expect(parsedError.code).toBe(UnexpectedRpcAddressNetworkError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("UnexpectedRpcAddressNetworkError 2", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_checkBalanceAgainstTransaction", [
      "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
      "net1235:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaahrk8ntcn",
      "0x5208",
      "0x2540be400",
      "0x0",
      "0x0",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(UnexpectedRpcAddressNetworkError);
    expect(parsedError.name).toBe("UnexpectedRpcAddressNetwork");
    expect(parsedError.code).toBe(UnexpectedRpcAddressNetworkError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("StorageLimitOutOfRangeError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_checkBalanceAgainstTransaction", [
      "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
      "net1234:aaejuaaaaaaaaaaaaaaaaaaaaaaaaaaaaayy7c99nt",
      "0x5208",
      "0x2540be400",
      "0xFFFFFFFFFFFFFFFFF",
      "0x0",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    console.log(error);
    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(StorageLimitOutOfRangeError);
    expect(parsedError.name).toBe("StorageLimitOutOfRange");
    expect(parsedError.code).toBe(StorageLimitOutOfRangeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
