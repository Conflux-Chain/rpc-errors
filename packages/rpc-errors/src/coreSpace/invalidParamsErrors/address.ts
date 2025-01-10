import { InvalidParamsError } from "./invalidParams";

export class InvalidBase32AddressError extends InvalidParamsError {
  override name = "InvalidBase32Address";
  static pattern = /Invalid base32 address: input (.*) error/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}

export class InvalidSize160AddressError extends InvalidParamsError {
  override name = "InvalidSize160Address";
  static pattern = /Invalid base32 address: input (.+) not a SIZE_160 address/;
  constructor(message: string, data?: any) {
    super(message, data);
  }
}
