import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import {
  assertRpcError,
  createErrorResponse,
  getFreePorts,
  sleep,
  TEST_PK,
} from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";

import { eSpaceErrors, RPCError } from "../src";

import { InvalidParamsError } from "../src/coreSpace/invalidParamsErrors/invalidParams";
import {
  ExceededMaxGasError,
  InsufficientFundsError,
  InsufficientGasError,
  UnrecognizedTransactionTypeError,
} from "../src/eSpace/invalidParamsErrors/transaction";
import { TransactionRejectedError } from "../src/eSpace";
import { MaxPriorityFeeExceedsMaxFeeError } from "../src/eSpace/transaction/transaction";
import { BlockHashesNotFoundError } from "../src/eSpace/executionError";
import { ExecutionError } from "../src/eSpace/executionError/executionError";
import { InvalidEpochIdError } from "../src/eSpace/executionError/block";
import { InvalidInputError } from "../src/eSpace/invalidInput/invalidInput";
import {
  InsufficientGasLimitError,
  NonceOutdatedError,
} from "../src/eSpace/invalidInput/transaction";
import { EthExecutionError } from "../src/eSpace/gethExecutionError/gethExecutionError";
import { EthInsufficientFundsError } from "../src/eSpace/gethExecutionError/transaction";
import { ContractExecutionRevertedError } from "../src/eSpace/gethExecutionError";
import { ExecutionRevertedError } from "../src/eSpace/gethExecutionError/contract";

const rpcError = new RPCError();
rpcError.registerError(eSpaceErrors);

let HTTP_PORT: number;

beforeAll(async () => {
  const [jsonrpcHttpPort, udpAndTcpPort] = await getFreePorts(2);
  HTTP_PORT = jsonrpcHttpPort as number;
  const server = await createServer({
    evmChainId: 1111,
    tcpPort: udpAndTcpPort,
    udpPort: udpAndTcpPort,
    jsonrpcHttpEthPort: jsonrpcHttpPort,
    genesisEvmSecrets: [TEST_PK],
    // log: true,
  });

  await server.start();

  return async () => await server.stop();
  // HTTP_PORT = 8545;
});

describe("eth_call errors", () => {
  test("MaxPriorityFeeExceedsMaxFeeError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_call", [
      {
        from: "0x13AeCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
        gas: "0x5208",
        maxFeePerGas: "0x1",
        maxPriorityFeePerGas: "0x10",
        nonce: "0x0",
        to: "0x13AeCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
        type: "0x2",
        value: "0x16345785d8a0000",
      },
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(TransactionRejectedError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(MaxPriorityFeeExceedsMaxFeeError);
    expect(parsedError.name).toBe("MaxPriorityFeeExceedsMaxFee");
    expect(parsedError.code).toBe(MaxPriorityFeeExceedsMaxFeeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("InsufficientGasError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_call", [
      {
        from: "0x13AeCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
        gas: "0x1",
        gasPrice: "0x1",
        nonce: "0x0",
        to: "0x13AeCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
        type: "0x0",
      },
    ]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(InsufficientGasError);
    expect(parsedError.name).toBe("InsufficientGas");
    expect(parsedError.code).toBe(InsufficientGasError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExceededMaxGasError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_call", [
      {
        from: "0x13AeCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
        gas: "0x11e1a300",
        gasPrice: "0x47868c00",
        nonce: "0x0",
        to: "0x13AeCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
        type: "0x0",
        value: "0x16345785d8a0000",
      },
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExceededMaxGasError);
    expect(parsedError.name).toBe("ExceededMaxGas");
    expect(parsedError.code).toBe(ExceededMaxGasError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("UnrecognizedTransactionTypeError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_call", [
      {
        from: "0x13AeCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
        gas: "0x5208",
        gasPrice: "0x47868c00",
        nonce: "0x0",
        to: "0x13AeCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
        type: "0x9",
        value: "0x16345785d8a0000",
      },
    ]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(UnrecognizedTransactionTypeError);
    expect(parsedError.name).toBe("UnrecognizedTransactionType");
    expect(parsedError.code).toBe(UnrecognizedTransactionTypeError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("BlockHashesNotFoundError", async () => {
    const error = createErrorResponse({
      code: -32016,
      message:
        "Error processing request: Msg error detail: cannot get block hashes in the specified epoch, maybe it does not exist?",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(ExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(BlockHashesNotFoundError);
    expect(parsedError.name).toBe("BlockHashesNotFound");
    expect(parsedError.code).toBe(BlockHashesNotFoundError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("InvalidEpochIdError", async () => {
    const error = createErrorResponse({
      code: -32016,
      message: "Error processing request: Msg error detail: invalid epoch id",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(ExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(InvalidEpochIdError);
    expect(parsedError.name).toBe("InvalidEpochId");
    expect(parsedError.code).toBe(InvalidEpochIdError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NonceOutdatedError", async () => {
    const error = createErrorResponse({
      code: -32000,
      message: "nonce is too old expected 1111 got 1",
    });
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidInputError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(NonceOutdatedError);
    expect(parsedError.name).toBe("NonceOutdated");
    expect(parsedError.code).toBe(NonceOutdatedError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("UnrecognizedTransactionTypeError", async () => {
    const error = createErrorResponse({
      code: -32000,
      message:
        "not enough gas limit with respected to tx size: expected 21000 got 0",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidInputError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(InsufficientGasLimitError);
    expect(parsedError.name).toBe("InsufficientGasLimit");
    expect(parsedError.code).toBe(InsufficientGasLimitError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("EthInsufficientFundsError", async () => {
    const error = createErrorResponse({
      code: 3,
      message: "insufficient funds for gas * price + value: 0)",
      data: "",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(EthExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(EthInsufficientFundsError);
    expect(parsedError.name).toBe("EthInsufficientFunds");
    expect(parsedError.code).toBe(EthInsufficientFundsError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ContractExecutionRevertedError", async () => {
    const error = createErrorResponse({
      code: 3,
      message: "execution reverted: revert: ",
      data: "0x245eCb0ed8C8C8BEFA9c3e0E0b6cA90f09d8cdB8",
    });
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(EthExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ContractExecutionRevertedError);
    expect(parsedError.name).toBe("ContractExecutionReverted");
    expect(parsedError.code).toBe(ContractExecutionRevertedError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionRevertedError", async () => {
    const error = createErrorResponse({
      code: 3,
      message: "execution reverted: ",
      data: "",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(EthExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExecutionRevertedError);
    expect(parsedError.name).toBe("ExecutionReverted");
    expect(parsedError.code).toBe(ExecutionRevertedError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
