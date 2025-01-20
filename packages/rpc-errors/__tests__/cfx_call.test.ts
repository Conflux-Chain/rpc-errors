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
  ExecutionErrorBumpNonceNotEnoughCashError,
  ExecutionErrorBumpNonceVmBadInstructionError,
  ExecutionErrorBumpNonceVmBadJumpDestinationError,
  ExecutionErrorBumpNonceVmBuiltInError,
  ExecutionErrorBumpNonceVmConflictAddressError,
  ExecutionErrorBumpNonceVmExceedStorageLimitError,
  ExecutionErrorBumpNonceVmInternalContractError,
  ExecutionErrorBumpNonceVmInvalidAddressError,
  ExecutionErrorBumpNonceVmInvalidSubEntryError,
  ExecutionErrorBumpNonceVmMutableCallInStaticContextError,
  ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageError,
  ExecutionErrorBumpNonceVmOutOfBoundsError,
  ExecutionErrorBumpNonceVmOutOfGasError,
  ExecutionErrorBumpNonceVmOutOfStackError,
  ExecutionErrorBumpNonceVmOutOfSubStackError,
  ExecutionErrorBumpNonceVmRevertedByBytecodeError,
  ExecutionErrorBumpNonceVmRevertedError,
  ExecutionErrorBumpNonceVmStackUnderflowError,
  ExecutionErrorBumpNonceVmStateDbError,
  ExecutionErrorBumpNonceVmSubStackUnderflowError,
  ExecutionErrorBumpNonceVmWasmError,
  NotExecutedDropInvalidRecipientAddress,
  NotExecutedDropNotEnoughGasLimitError,
  NotExecutedDropOldNonceError,
  NotExecutedToReconsiderPackingEpochHeightOutOfBoundError,
  NotExecutedToReconsiderPackingInvalidNonceError,
  NotExecutedToReconsiderPackingNotEnoughBaseFeeError,
  NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError,
  NotExecutedToReconsiderPackingSenderDoesNotExistError,
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

    expect(parsedError).toBeInstanceOf(NotExecutedDropNotEnoughGasLimitError);
    expect(parsedError.name).toBe("NotExecutedDropNotEnoughGasLimit");
    expect(parsedError.code).toBe(NotExecutedDropNotEnoughGasLimitError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NotExecutedToReconsiderPackingInvalidNonceError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction can not be executed",
      data: "InvalidNonce { expected: 10, got: 20 }",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      NotExecutedToReconsiderPackingInvalidNonceError
    );
    expect(parsedError.name).toBe("NotExecutedToReconsiderPackingInvalidNonce");
    expect(parsedError.code).toBe(
      NotExecutedToReconsiderPackingInvalidNonceError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NotExecutedToReconsiderPackingEpochHeightOutOfBound", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction can not be executed",
      data: "EpochHeightOutOfBound { block_height: 100, set: 50, transaction_epoch_bound: 150 }",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      NotExecutedToReconsiderPackingEpochHeightOutOfBoundError
    );
    expect(parsedError.name).toBe(
      "NotExecutedToReconsiderPackingEpochHeightOutOfBound"
    );
    expect(parsedError.code).toBe(
      NotExecutedToReconsiderPackingEpochHeightOutOfBoundError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction can not be executed",
      data: "NotEnoughCashFromSponsor { required_gas_cost: 0, gas_sponsor_balance: 0, required_storage_cost: 0, storage_sponsor_balance: 0 }",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError
    );
    expect(parsedError.name).toBe(
      "NotExecutedToReconsiderPackingNotEnoughCashFromSponsor"
    );
    expect(parsedError.code).toBe(
      NotExecutedToReconsiderPackingNotEnoughCashFromSponsorError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NotExecutedToReconsiderPackingSenderDoesNotExistError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction can not be executed",
      data: "SenderDoesNotExist",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      NotExecutedToReconsiderPackingSenderDoesNotExistError
    );
    expect(parsedError.name).toBe(
      "NotExecutedToReconsiderPackingSenderDoesNotExist"
    );
    expect(parsedError.code).toBe(
      NotExecutedToReconsiderPackingSenderDoesNotExistError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NotExecutedToReconsiderPackingNotEnoughBaseFeeError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction can not be executed",
      data: "NotEnoughBaseFee { expected: 0, got: 0 }",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      NotExecutedToReconsiderPackingNotEnoughBaseFeeError
    );
    expect(parsedError.name).toBe(
      "NotExecutedToReconsiderPackingNotEnoughBaseFee"
    );
    expect(parsedError.code).toBe(
      NotExecutedToReconsiderPackingNotEnoughBaseFeeError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmRevertedError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction reverted",
      data: "0x0000000000000000000000000000000000000000000000000000000000000001",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExecutionErrorBumpNonceVmRevertedError);
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmReverted");
    expect(parsedError.code).toBe(ExecutionErrorBumpNonceVmRevertedError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceNotEnoughCashError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "NotEnoughCash { required: 0, got: 0, actual_gas_cost: 0, max_storage_limit_cost: 0 }",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceNotEnoughCashError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceNotEnoughCash");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceNotEnoughCashError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmOutOfGasError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Out of gas",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExecutionErrorBumpNonceVmOutOfGasError);
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmOutOfGas");
    expect(parsedError.code).toBe(ExecutionErrorBumpNonceVmOutOfGasError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmBadJumpDestinationError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Bad jump destination 1a",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmBadJumpDestinationError
    );
    expect(parsedError.name).toBe(
      "ExecutionErrorBumpNonceVmBadJumpDestination"
    );
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmBadJumpDestinationError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmBadInstructionError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Bad instruction ff",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmBadInstructionError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmBadInstruction");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmBadInstructionError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmStackUnderflowError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Stack underflow ADD 2/1",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmStackUnderflowError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmStackUnderflow");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmStackUnderflowError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmOutOfStackError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Out of stack PUSH 1024/1023",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmOutOfStackError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmOutOfStack");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmOutOfStackError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmSubStackUnderflowError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Subroutine stack underflow 2/1",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmSubStackUnderflowError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmSubStackUnderflow");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmSubStackUnderflowError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmOutOfSubStackError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Out of subroutine stack 2/1",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmOutOfSubStackError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmOutOfSubStack");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmOutOfSubStackError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmInvalidSubEntryError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Invalid Subroutine Entry via BEGINSUB",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmInvalidSubEntryError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmInvalidSubEntry");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmInvalidSubEntryError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmOutOfSubStackError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Out of subroutine stack 2/1",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmOutOfSubStackError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmOutOfSubStack");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmOutOfSubStackError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Not enough balance for storage 1000/500",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageError
    );
    expect(parsedError.name).toBe(
      "ExecutionErrorBumpNonceVmNotEnoughBalanceForStorage"
    );
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmNotEnoughBalanceForStorageError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });
  test("ExecutionErrorBumpNonceVmExceedStorageLimitError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Exceed storage limit",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmExceedStorageLimitError
    );
    expect(parsedError.name).toBe(
      "ExecutionErrorBumpNonceVmExceedStorageLimit"
    );
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmExceedStorageLimitError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmBuiltInError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Built-in failed: modexp",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExecutionErrorBumpNonceVmBuiltInError);
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmBuiltIn");
    expect(parsedError.code).toBe(ExecutionErrorBumpNonceVmBuiltInError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmInternalContractError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "InternalContract failed: some error message",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmInternalContractError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmInternalContract");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmInternalContractError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmStateDbError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Irrecoverable state db error: database error message",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExecutionErrorBumpNonceVmStateDbError);
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmStateDb");
    expect(parsedError.code).toBe(ExecutionErrorBumpNonceVmStateDbError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmMutableCallInStaticContextError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Mutable call in static context",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmMutableCallInStaticContextError
    );
    expect(parsedError.name).toBe(
      "ExecutionErrorBumpNonceVmMutableCallInStaticContext"
    );
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmMutableCallInStaticContextError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmWasmError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Internal error: wasm error message",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExecutionErrorBumpNonceVmWasmError);
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmWasm");
    expect(parsedError.code).toBe(ExecutionErrorBumpNonceVmWasmError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmOutOfBoundsError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Out of bounds",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmOutOfBoundsError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmOutOfBounds");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmOutOfBoundsError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmRevertedByBytecodeError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Reverted by bytecode",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmRevertedByBytecodeError
    );
    expect(parsedError.name).toBe(
      "ExecutionErrorBumpNonceVmRevertedByBytecode"
    );
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmRevertedByBytecodeError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmInvalidAddressError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "InvalidAddress: cfx:aaaaaa",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmInvalidAddressError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmInvalidAddress");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmInvalidAddressError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExecutionErrorBumpNonceVmConflictAddressError", async () => {
    // fake response
    const error = createErrorResponse({
      code: CallExecutionError.code,
      message: "Transaction execution failed",
      data: "Contract creation on an existing address: xxxx",
    });

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(CallExecutionError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(
      ExecutionErrorBumpNonceVmConflictAddressError
    );
    expect(parsedError.name).toBe("ExecutionErrorBumpNonceVmConflictAddress");
    expect(parsedError.code).toBe(
      ExecutionErrorBumpNonceVmConflictAddressError.code
    );
    expect(parsedError.message).toBe(error.error.message);
  });
});
