import { InvalidParamsError } from "./invalidParams";

export class InvalidBase32AddressError extends InvalidParamsError {
  override name = "InvalidBase32Address";
  static pattern = /Invalid base32 address: input (.*) error/;

  static override parseError(message: string): boolean {
    return InvalidBase32AddressError.pattern.test(message);
  }
}

export class InvalidSize160AddressError extends InvalidParamsError {
  override name = "InvalidSize160Address";
  static pattern = /Invalid base32 address: input (.+) not a SIZE_160 address/;

  static override parseError(message: string): boolean {
    return InvalidSize160AddressError.pattern.test(message);
  }
}

export class UnexpectedRpcAddressNetworkError extends InvalidParamsError {
  override name = "UnexpectedRpcAddressNetwork";
  static pattern = /network prefix unexpected: ours (\w+), got (\w+)/;
  static override parseError(_message: string, data = ""): boolean {
    return UnexpectedRpcAddressNetworkError.pattern.test(data);
  }
}
