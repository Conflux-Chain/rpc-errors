import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts, sleep, TEST_PK } from "./help";

import { createRequest } from "../src/utils/request";
import { isRpcError } from "../src/utils/isRpcError";

import { eSpaceErrors, RPCError } from "../src";

import { InvalidParamsError } from "../src/coreSpace/invalidParamsErrors/invalidParams";
import { FailedToDecodeSignedTransactionError } from "../src/eSpace/invalidParamsErrors/transaction";
import {
  ExceedsBlockGasLimitError,
  IncorrectTransactionSpaceError,
  InternalError,
  TransactionUnderpricedError,
} from "../src/eSpace/internalErrors";
import { TransactionRejectedError } from "../src/eSpace";
import { NonceTooHighError } from "../src/eSpace/transaction";

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
});

describe("eth_sendRawTransaction errors", () => {
  test("FailedToDecodeSignedTransactionError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_sendRawTransaction", [
      "0xf865808405f5e1008252089413aecb0ed8c8c8b08209c7a0eb8ba7c1e9ccf3de11d885b00e5454cda0cb8e5a9b9a8e0ab48afbc0c12ece39a03a7cc06f14f587e16d1f9b7746d3b40e220054014028e5c1de8868a09c5603e1",
    ]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InvalidParamsError.code);

    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(FailedToDecodeSignedTransactionError);
    expect(parsedError.name).toBe("FailedToDecodeSignedTransaction");
    expect(parsedError.code).toBe(FailedToDecodeSignedTransactionError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
  test("IncorrectTransactionSpaceError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_sendRawTransaction", [
      "0xf870ec01018252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb88b084595161401484a00000080808204d28080a001e08b11c8eb1660df4de3f19ad472f83e49176cfcc2b95706c025ecbd55398ea077b9737341ff68664700739db57a4a7f865a23e0b25c861b0f81685d3fdbcc5c",
    ]);
    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InternalError.code);

    const parsedError = rpcError.parse(error.error);
    expect(parsedError).toBeInstanceOf(IncorrectTransactionSpaceError);
    expect(parsedError.name).toBe("IncorrectTransactionSpace");
    expect(parsedError.code).toBe(IncorrectTransactionSpaceError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("ExceedsBlockGasLimitError", async () => {
    await sleep(2000);
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_sendRawTransaction", [
      "0xf867808404c4b4008404c4b4009413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb880808208d2a0040e15c48978e367994c248214efb579793251fd6453c390d2c4f3819f43b9f1a015335fade162d096a2a4fa9e3e16fb16b46ec1843c80f24169f34a1aca737e3d",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InternalError.code);
    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(ExceedsBlockGasLimitError);
    expect(parsedError.name).toBe("ExceedsBlockGasLimit");
    expect(parsedError.code).toBe(ExceedsBlockGasLimitError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("TransactionUnderpricedError", async () => {
    await sleep(2000);
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_sendRawTransaction", [
      "0xf86180808252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb880808208d1a070dff00977d76618c638e814e73e298ff84b5b23b2593f3809b6d79a2664dd49a0587804f29aafbb516e0f20719b6b8d7906df0eb01cd18e2ab6ab530bb5d90aa6",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(InternalError.code);
    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(TransactionUnderpricedError);
    expect(parsedError.name).toBe("TransactionUnderpriced");
    expect(parsedError.code).toBe(TransactionUnderpricedError.code);
    expect(parsedError.message).toBe(error.error.message);
  });

  test("NonceTooHighError", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("eth_sendRawTransaction", [
      "0xf867820bb88405f5e1008252089413aecb0ed8c8c8befa9c3e0e0b6ca90f09d8cdb880808208d1a027c341e15048f19ccf4cddf771996e715460b3590101b57ec0b497ddca5d8693a07ecf8d56cc5355b776c590f644f7243d64dfe8655a423eec53310060c8ddd348",
    ]);

    expect(isRpcError(error)).toBe(true);
    assertRpcError(error);
    expect(error.error.code).toBe(TransactionRejectedError.code);
    const parsedError = rpcError.parse(error.error);

    expect(parsedError).toBeInstanceOf(NonceTooHighError);
    expect(parsedError.name).toBe("NonceTooHigh");
    expect(parsedError.code).toBe(NonceTooHighError.code);
    expect(parsedError.message).toBe(error.error.message);
  });
});
