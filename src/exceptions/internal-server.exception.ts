import { StatusCodes } from "status-code";
import { BaseException } from "./base.exception.ts";

export class InternalServerErrorException extends BaseException {
  constructor(message?: string) {
    super(
      "INTERNAL_SERVER_ERROR",
      message ?? "Internal Server Error",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
