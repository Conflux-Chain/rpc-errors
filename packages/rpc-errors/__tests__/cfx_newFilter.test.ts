import { createServer } from "@xcfx/node";
import { beforeAll, describe, expect, test } from "vitest";
import { assertRpcError, getFreePorts } from "./help";

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
    pollLifetimeInSeconds: 100,
  });

  await server.start();

  return async () => await server.stop();
});

describe("cfx_newFilter errors", async () => {
  test("invalid params(pass number)", async () => {
    const request = createRequest(`http://localhost:${HTTP_PORT}`);
    const error = await request<string>("cfx_newFilter", [
      {
        fromEpoch: 1,
        toEpoch: "0x87431b",
        address: "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        topics: [
          [
            "0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5",
            "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435",
          ],
          null,
          "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26",
        ],
      },
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
    const error = await request<string>("cfx_newFilter", [
      {
        fromEpoch: "0x",
        toEpoch: "0x87431b",
        address: "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        topics: [
          [
            "0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5",
            "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435",
          ],
          null,
          "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26",
        ],
      },
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
    const error = await request<string>("cfx_newFilter", [
      {
        fromEpoch: "0xinvalid",
        toEpoch: "0x87431b",
        address: "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        topics: [
          [
            "0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5",
            "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435",
          ],
          null,
          "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26",
        ],
      },
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
    const error = await request<string>("cfx_newFilter", [
      {
        fromEpoch: "1",
        toEpoch: "0x87431b",
        address: "cfx:type.contract:acc7uawf5ubtnmezvhu9dhc6sghea0403y2dgpyfjp",
        topics: [
          [
            "0x233e08777131763a85257b15eafc9f96ef08f259653d9944301ff924b3917cf5",
            "0xd7fb65c06987247ab480a21659e16bdf0b5862a19869ec264075d50ab3525435",
          ],
          null,
          "0x0000000000000000000000001d618f9b63eca8faf90faa9cb799bf4bfe616c26",
        ],
      },
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
});
