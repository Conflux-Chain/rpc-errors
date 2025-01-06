import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";
import { InvalidParamsError } from "../src/coreSpace/invalidParams/invalidParams";
import { coreSpaceErrors, RPCError } from "../src";
import {
  EmptyEpochStringError,
  EpochNumberTooLargeError,
  InvalidDigitEpochError,
  InvalidEpochTypeError,
  MissingHexPrefixError,
} from "../src/coreSpace/invalidParams/epoch";
import { InvalidHashTypeError } from "../src/coreSpace/invalidParams/hash";

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

describe("cfx_getTransactionByHash errors", async () => {
  test("invalid tx hash(length is not 66)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getTransactionByHash", [
      "0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944",
    ]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(InvalidHashTypeError);
    expect(parsedError.name).toBe("InvalidHashType");
    expect(parsedError.code).toBe(InvalidHashTypeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx hash (pass number)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getTransactionByHash", [11]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(InvalidHashTypeError);
    expect(parsedError.name).toBe("InvalidHashType");
    expect(parsedError.code).toBe(InvalidHashTypeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx hash (pass empty hex string)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getTransactionByHash", ["0x"]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(InvalidHashTypeError);
    expect(parsedError.name).toBe("InvalidHashType");
    expect(parsedError.code).toBe(InvalidHashTypeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
