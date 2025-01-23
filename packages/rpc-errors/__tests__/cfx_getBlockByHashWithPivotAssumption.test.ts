import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, createErrorResponse, getFreePorts } from "./help";

import { isRpcError } from "../src/utils/isRpcError";
import { InvalidParamsError } from "../src/coreSpace/invalidParamsErrors/invalidParams";
import { coreSpaceErrors, RPCError } from "../src";

import {
  BlockNotFoundError,
  PivotChainAssumptionFailedError,
} from "../src/coreSpace/invalidParamsErrors/block";

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

describe("cfx_getBlockByHashWithPivotAssumption errors", async () => {
  test("PivotChainAssumptionFailedError", async () => {
    const error = await createErrorResponse({
      code: InvalidParamsError.code,
      message: "pivot chain assumption failed",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(PivotChainAssumptionFailedError);
    expect(parsedError.name).toBe("PivotChainAssumptionFailed");
    expect(parsedError.code).toBe(PivotChainAssumptionFailedError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("BlockNotFoundError", async () => {
    const error = await createErrorResponse({
      code: InvalidParamsError.code,
      message: "Block not found",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(BlockNotFoundError);
    expect(parsedError.name).toBe("BlockNotFound");
    expect(parsedError.code).toBe(BlockNotFoundError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
