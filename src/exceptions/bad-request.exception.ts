import { StatusCodes } from "status-code";
import { BaseException } from "./base.exception.ts";

export class BadRequestException extends BaseException {
  constructor() {
    super("BAD_REQUEST", "Bad Request", StatusCodes.BAD_REQUEST);
  }
}
