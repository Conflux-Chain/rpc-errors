import { CallExecutionError } from "./callExecution";

export type NotExecutedDropOldNonceErrorType = {
  name: "NotExecutedDropOldNonce";
} & NotExecutedDropOldNonceError;

export class NotExecutedDropOldNonceError extends CallExecutionError {
  override name = "NotExecutedDropOldNonce";
  static pattern = /nonce is too old expected (\d+) got (\d+)/;
  constructor(message: string, data?: any) {
    super(message, data);
  }

  static override parseError(message: string, data?: any): boolean {
    return NotExecutedDropOldNonceError.pattern.test(data);
  }
}

export type NotExecutedDropInvalidRecipientAddressType = {
  name: "NotExecutedDropInvalidRecipientAddress";
} & NotExecutedDropInvalidRecipientAddress;

export class NotExecutedDropInvalidRecipientAddress extends CallExecutionError {
  override name = "NotExecutedDropInvalidRecipientAddress";
  static pattern = /invalid recipient address/;
  constructor(message: string, data?: any) {
    super(message, data);
  }

  static override parseError(message: string, data?: any): boolean {
    return NotExecutedDropInvalidRecipientAddress.pattern.test(data);
  }
}

export type NotExecutedDropNotEnoughGasLimitErrorType = {
  name: "NotExecutedDropNotEnoughGasLimit";
} & NotExecutedDropNotEnoughGasLimitError;

export class NotExecutedDropNotEnoughGasLimitError extends CallExecutionError {
  override name = "NotExecutedDropNotEnoughGasLimit";
  static pattern =
    /not enough gas limit with respected to tx size: expected (\d+) got (\d+)/;
  constructor(message: string, data?: any) {
    super(message, data);
  }

  static override parseError(message: string, data?: any): boolean {
    return NotExecutedDropNotEnoughGasLimitError.pattern.test(data);
  }
}
