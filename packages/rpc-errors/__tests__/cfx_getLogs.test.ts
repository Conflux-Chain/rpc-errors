import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, createErrorResponse, getFreePorts } from "./help";

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
import { UnexpectedRpcAddressNetworkError } from "../src/coreSpace/invalidParamsErrors/address";
import { BlockHashesLimitExceededError } from "../src/coreSpace/invalidParamsErrors/block";
import { ExceededTopicsLimitError } from "../src/coreSpace/invalidParamsErrors/topic";
import {
  ExceededLogsLimitError,
  MissingFilterParametersError,
} from "../src/coreSpace/invalidParamsErrors/logs";

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
const addr = "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp";
const defaultFilter = {
  fromEpoch: "0x0",
  toEpoch: "0x0",
  address: "net1234:aak47w2s5depvt14xu9a6c5pzehux0gr1a603jhfxh",
  topics: [
    [
      "0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5",
      "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435",
    ],
    null,
    "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26",
  ],
};

describe("cfx_getLogs errors", async () => {
  test("UnexpectedRpcAddressNetworkError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getLogs", [
      { ...defaultFilter, address: addr },
    ]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidEpochTypeError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(UnexpectedRpcAddressNetworkError);
    expect(parsedError.name).toBe("UnexpectedRpcAddressNetwork");
    expect(parsedError.code).toBe(UnexpectedRpcAddressNetworkError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid params(pass number)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getLogs", [
      { ...defaultFilter, fromEpoch: 1 },
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
    const error = await request<string>("cfx_getLogs", [
      { ...defaultFilter, fromEpoch: "0x" },
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
    const error = await request<string>("cfx_getLogs", [
      { ...defaultFilter, fromEpoch: "0xinvalid" },
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
    const error = await request<string>("cfx_getLogs", [
      { ...defaultFilter, fromEpoch: "1" },
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

  test("invalid params(invalid hex string without 0x prefix)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_getLogs", [
      { ...defaultFilter, fromEpoch: "1" },
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

  test("BlockHashesLimitExceededError", async () => {
    // fake response
    const error = createErrorResponse({
      code: InvalidParamsError.code,
      message:
        "filter.block_hashes can contain up to 128 hashes; 150 were provided.",
      data: "",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(BlockHashesLimitExceededError);
    expect(parsedError.name).toBe("BlockHashesLimitExceeded");
    expect(parsedError.code).toBe(BlockHashesLimitExceededError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExceededTopicsLimitError", async () => {
    // fake response
    const error = createErrorResponse({
      code: InvalidParamsError.code,
      message: "filter.topics can contain up to 4 topics; 6 were provided.",
      data: "",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExceededTopicsLimitError);
    expect(parsedError.name).toBe("ExceededTopicsLimit");
    expect(parsedError.code).toBe(ExceededTopicsLimitError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("MissingFilterParametersError", async () => {
    // fake response
    const error = createErrorResponse({
      code: InvalidParamsError.code,
      message:
        "Filter must provide one of the following: (1) an epoch range through `fromEpoch` and `toEpoch`, (2) a block number range through `fromBlock` and `toBlock`, (3) a set of block hashes through `blockHashes`",
      data: "",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(MissingFilterParametersError);
    expect(parsedError.name).toBe("MissingFilterParameters");
    expect(parsedError.code).toBe(MissingFilterParametersError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExceededLogsLimitError", async () => {
    // fake response
    const error = createErrorResponse({
      code: InvalidParamsError.code,
      message:
        "This query results in too many logs, max limitation is 10000, please filter results by a smaller epoch/block range",
      data: "",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExceededLogsLimitError);
    expect(parsedError.name).toBe("ExceededLogsLimit");
    expect(parsedError.code).toBe(ExceededLogsLimitError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
