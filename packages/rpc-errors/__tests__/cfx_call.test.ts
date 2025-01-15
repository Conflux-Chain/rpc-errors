import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, createErrorResponse, getFreePorts } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";
import { InvalidParamsError } from "../src/coreSpace/invalidParamsErrors/invalidParams";
import { coreSpaceErrors, RPCError } from "../src";
import {
  EmptyEpochStringError,
  EpochNumberTooLargeError,
  InvalidDigitEpochError,
  MissingHexPrefixError,
} from "../src/coreSpace/invalidParamsErrors/epoch";
import {
  NotExecutedDropInvalidRecipientAddress,
  NotExecutedDropNotEnoughGasLimitError,
  NotExecutedDropOldNonceError,
} from "../src/coreSpace/CallExecutionErrors/executionOutcome";
import { CallExecutionError } from "../src/coreSpace/CallExecutionErrors/callExecution";

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

describe("cfx_call errors", async () => {
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

  test("NotExecutedDropOldNonce", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction can not be executed",
      data: "nonce is too old expected 1 got 0",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(NotExecutedDropOldNonceError);
    expect(parsedError.name).toBe("NotExecutedDropOldNonce");
    expect(parsedError.code).toBe(NotExecutedDropOldNonceError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NotExecutedDropInvalidRecipientAddress", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction can not be executed",
      data: "invalid recipient address cfx:type.user:aarc9abycue0hhzgyrr53m6cxedgccrmmyybjgh4xg",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(NotExecutedDropInvalidRecipientAddress);
    expect(parsedError.name).toBe("NotExecutedDropInvalidRecipientAddress");
    expect(parsedError.code).toBe(NotExecutedDropInvalidRecipientAddress.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NotExecutedDropNotEnoughGasLimitError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction can not be executed",
      data: "not enough gas limit with respected to tx size: expected 1 got 0",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);
    console.log(error);
    expect(parsedError).toBeInstanceOf(NotExecutedDropNotEnoughGasLimitError);
    expect(parsedError.name).toBe("NotExecutedDropNotEnoughGasLimit");
    expect(parsedError.code).toBe(NotExecutedDropNotEnoughGasLimitError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
