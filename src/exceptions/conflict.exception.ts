import { StatusCodes } from "status-code";
import { BaseException } from "./base.exception.ts";

export class ConflictException extends BaseException {
  constructor(message: string) {
    super("CONFLICT", message, StatusCodes.CONFLICT);
  }
}
