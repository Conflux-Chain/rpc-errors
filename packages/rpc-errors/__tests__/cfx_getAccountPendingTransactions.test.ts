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

describe("cfx_getAccountPendingTransactions errors", async () => {
  test("UnexpectedRpcAddressNetworkError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getAccountPendingTransactions", [
      waringAddr,
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
});
