import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts, TEST_ADDRESS, TEST_PK } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";

import { coreSpaceErrors, RPCError } from "../src";
import {
  GasLimitExceededError,
  RlpInvalidLengthError,
  RlpIsTooShortError,
  TransactionAlreadyExistError,
  TransactionChainIdMismatchError,
  TransactionInvalidReceiverError,
  TransactionNonceTooDistantError,
  TransactionNotEnoughBaseGasError,
  TransactionTooBigError,
  TransactionZeroGasPriceError,
  UnrecoverablePubkeyError,
} from "../src/coreSpace/invalidParamsErrors/transaction";
import { InvalidParamsError } from "../src/coreSpace/invalidParamsErrors/invalidParams";

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
    genesisSecrets: [TEST_PK],
  });

  await server.start();

  return async () => await server.stop();
});

describe("cfx_sendRawTransaction errors", () => {
  test("invalid tx RLPIsTooShort", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf86eea8201a28207d0830f4240943838197c0c88d0d5b13b67e1bfdbdc132d4842e389056bc75e2d631000008080a017b8b26f473820475edc49bd153660e56b973b5985bbdb2828fceacb4c91f389a03452f9a69da34ef35acc9c554d7b1d63e9041141674b42c3abb1b57b9f83a2d3",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(RlpIsTooShortError);
    expect(parsedError.name).toBe("RlpIsTooShort");
    expect(parsedError.code).toBe(RlpIsTooShortError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
  test("invalid tx RlpInvalidLength", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", ["0x"]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(RlpInvalidLengthError);
    expect(parsedError.name).toBe("RlpInvalidLength");
    expect(parsedError.code).toBe(RlpInvalidLengthError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx UnrecoverablePubkey", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf871ed80843b9aca008252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb888016345785d8a000080808204d28080a015bf4f12ab31410bf7c0dc88b1b081bd689aa827e6022b13f45209a4cb276e31a007fe2e5081accd6290113fb89279f21ba36a415e46e5f20ce51604bdc0aca9fe",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(UnrecoverablePubkeyError);
    expect(parsedError.name).toBe("UnrecoverablePubkey");
    expect(parsedError.code).toBe(UnrecoverablePubkeyError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx UnrecoverablePubkey", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    await request<string>("cfx_sendRawTransaction", [
      "0xf871ed80843b9aca008252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb888016345785d8a000080808204d28080a015bf4f12ab31410bf7c0dc88b1b081bd689aa827e6022b13f45209a4cb276e33a007fe2e5081accd6290113fb89279f21ba36a415e46e5f20ce51604bdc0aca9fe",
    ]);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf871ed80843b9aca008252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb888016345785d8a000080808204d28080a015bf4f12ab31410bf7c0dc88b1b081bd689aa827e6022b13f45209a4cb276e33a007fe2e5081accd6290113fb89279f21ba36a415e46e5f20ce51604bdc0aca9fe",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(TransactionAlreadyExistError);
    expect(parsedError.name).toBe("TransactionAlreadyExist");
    expect(parsedError.code).toBe(TransactionAlreadyExistError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx TooBig", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      `0xfa032079fa03203280843b9aca0084013880009413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb888016345785d8a000080808204d2ba032000${Array.from(
        { length: 400 * 1024 }
      )
        .fill("1")
        .join(
          ""
        )}01a0d5e510af54dd9c9a90b3e6b68c087f23dc7fcfc4eb59d94a01925187460ebba2a064284caa7a18064ce9fc823485d8822274238f070f5c841a0270422e1fb733ae`,
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(TransactionTooBigError);
    expect(parsedError.name).toBe("TransactionTooBig");
    expect(parsedError.code).toBe(TransactionTooBigError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx ChainIdMismatch", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf86feb80843b9aca008252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb888016345785d8a00008080018080a071886d726b7bdd886aacbeb55e94ed5d93ebc923d481f9a37093bae4b90c9bd4a05ba2cc7b576f3f09838851f90d3cc096e101d118eb1dcb0a2c49f9bc68b77192",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(TransactionChainIdMismatchError);
    expect(parsedError.name).toBe("TransactionChainIdMismatch");
    expect(parsedError.code).toBe(TransactionChainIdMismatchError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx ZeroGasPrice", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf86de980808252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb888016345785d8a000080808204d28001a010f62126aeb81170ecf86a02fbb46022dcabbad5f866847cea0834172539d78ea059a1ebcf7ca3e3c3a315f7b94d586d72ab2ca9bdeb3c347dd6e23b28b39002c2",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(TransactionZeroGasPriceError);
    expect(parsedError.name).toBe("TransactionZeroGasPrice");
    expect(parsedError.code).toBe(TransactionZeroGasPriceError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx InvalidReceiver", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf86feb808401406f4080943e7a88a00f6faa99ecd425d258d92374e6f1cfbf88016345785d8a000080808204d28080a0b7264ee313bb826cce77227bb6ff478f2382c16de2aaf0f295ed5914d813442ba0722acf1bf2f6fd80e3583c930c61833bf77fb989dafee5b4769646d63c6fe174",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(TransactionInvalidReceiverError);
    expect(parsedError.name).toBe("TransactionInvalidReceiver");
    expect(parsedError.code).toBe(TransactionInvalidReceiverError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx NotEnoughBaseGas", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf869e5808405f5e100824e209413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb88080808204d28080a01513c0028ff6db580405b6e5058d5065a850bb8e39d37734285baf0a3d0a4cefa0455b2f85df13e81ee5cdfb10d67f07d364f2f8dae45498db49b0dc0271382c2b",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(TransactionNotEnoughBaseGasError);
    expect(parsedError.name).toBe("TransactionNotEnoughBaseGas");
    expect(parsedError.code).toBe(TransactionNotEnoughBaseGasError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx GasLimitExceeded", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf86be7808405f5e1008401c9c3809413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb88080808204d28001a03f7a37fc101b44d76ff8cf36f67597bdc199a7b42f2741ba74fe2e3f5ec5995da05b29edfc5ae1f53ccc5beda7eff4bd82ff2a6181ee3321fd7ebc393657217e23",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(GasLimitExceededError);
    expect(parsedError.name).toBe("GasLimitExceeded");
    expect(parsedError.code).toBe(GasLimitExceededError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("invalid tx NonceTooDistant", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_sendRawTransaction", [
      "0xf867e3824e20018252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb88080808204d28080a030c3f8427199d9b9c8f6dacd9b1aa6c82c86f02daa2611ee586c352a16d87a25a00fa222bc85b4ee867650a58db56b46b7e565f01596c26792869028417a28dd67",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(TransactionNonceTooDistantError);
    expect(parsedError.name).toBe("TransactionNonceTooDistant");
    expect(parsedError.code).toBe(TransactionNonceTooDistantError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
