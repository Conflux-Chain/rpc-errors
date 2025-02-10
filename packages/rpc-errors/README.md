# rpc-errors

A library for handling and wrapping Conflux network RPC errors.

## Installation

```bash
npm install @cfxjs/rpc-errors
# or
pnpm add @cfxjs/rpc-errors
# or
yarn add @cfxjs/rpc-errors
```

## Usage

```ts
import { RPCError, coreSpaceErrors } from "@cfxjs/rpc-errors";

// Create an RPC error handler
const rpcError = new RPCError();

// Register core space errors
rpcError.registerError(coreSpaceErrors);

const response = await fetch("https://main.confluxrpc.com/", {
  headers: {
    accept: "application/json",
  },
  body: '{"id":1,"jsonrpc":"2.0","params":[{"accessList":[]},null],"method":"cfx_call"}',
  method: "POST",
}).then((response) => response.json());

if (response.error) {
  const parsedError = rpcError.parse(response.error);

  if (parsedError instanceof NotExecutedDropInvalidRecipientAddress) {
    console.error("Error: Invalid recipient address.");
  }
}
```

### License

MIT
