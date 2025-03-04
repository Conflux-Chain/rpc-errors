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
} from "../src/coreSpace/invalidParamsErrors/epoch";

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

const defaultTx = {
  from: "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
  to: "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
  gasPrice: "0x5f5e100",
  gas: "0x5208",
  nonce: "0x0",
  storageLimit: "0x0",
  type: "0x0",
};

describe("cfx_estimateGasAndCollateral errors", async () => {
  test("invalid params(pass number)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_estimateGasAndCollateral", [
      defaultTx,
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

  test("invalid params(empty hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_estimateGasAndCollateral", [
      defaultTx,
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
    const error = await request<string>("cfx_estimateGasAndCollateral", [
      defaultTx,

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
    const error = await request<string>("cfx_estimateGasAndCollateral", [
      defaultTx,
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
});
