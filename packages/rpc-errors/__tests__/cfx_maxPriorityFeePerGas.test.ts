import { describe, expect, test } from "vitest";
import { isRpcError } from "../src/utils/isRpcError";
import { assertRpcError, createErrorResponse } from "./help";
import { InvalidParamsError } from "../src/coreSpace/invalidParamsErrors/invalidParams";
import { coreSpaceErrors, RPCError } from "../src";
import { NonExistentBlockHeaderError } from "../src/coreSpace/invalidParamsErrors/fee";
import { NonExistentBlockHeaderError as InternalNonExistentBlockHeaderError } from "../src/coreSpace/InternalErrors/fee";
import InternalErrors from "../src/coreSpace/InternalErrors";
import { InternalError } from "../src/coreSpace/InternalErrors/Internal";

const invalid_params_error = createErrorResponse({
  code: -32602,
  message: "Specified block header does not exist",
});

const internal_error = createErrorResponse({
  code: -32603,
  message: "Specified block header does not exist",
});
const rpcError = new RPCError();
rpcError.registerError(coreSpaceErrors);
rpcError.registerError(InternalErrors);

// error happens only if the fetch header has inconsistent block height

// this case can't be simulated by the test

describe("cfx_maxPriorityFeePerGas", () => {

  // the conflux-rust 2.4.1 will return InvalidParamsError
  test("invalid params", async () => {
    expect(isRpcError(invalid_params_error)).toBe(true);
    assertRpcError(invalid_params_error);
    expect(invalid_params_error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(invalid_params_error.error);
    expect(parsedError).toBeInstanceOf(NonExistentBlockHeaderError);
    expect(parsedError.name).toBe("NonExistentBlockHeader");
    expect(parsedError.code).toBe(NonExistentBlockHeaderError.code);
    expect(parsedError.message).toBe(invalid_params_error.error.message);
  });

  // larger than 2.4.1 will return InternalError
  test("internal error", async () => {
    expect(isRpcError(internal_error)).toBe(true);
    assertRpcError(internal_error);
    expect(internal_error.error.code).toBe(InternalError.code);

    const parsedError = rpcError.parse(internal_error.error);
    console.log(parsedError.code)
    expect(parsedError).toBeInstanceOf(InternalNonExistentBlockHeaderError);
    expect(parsedError.name).toBe("NonExistentBlockHeader");
    expect(parsedError.code).toBe(InternalNonExistentBlockHeaderError.code);
    expect(parsedError.message).toBe(internal_error.error.message);
  });
});
