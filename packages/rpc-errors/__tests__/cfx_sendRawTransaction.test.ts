import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts, TEST_ADDRESS, TEST_PK } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";

import { coreSpaceErrors, RPCError } from "../src";
import {
  RlpInvalidLengthError,
  RlpIsTooShortError,
  TransactionAlreadyExistError,
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
    const banlanc = await request<string>("cfx_getBalance", [TEST_ADDRESS]);
    console.log(banlanc);
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
    console.log(error);
    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(TransactionAlreadyExistError);
    expect(parsedError.name).toBe("TransactionAlreadyExist");
    expect(parsedError.code).toBe(TransactionAlreadyExistError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
