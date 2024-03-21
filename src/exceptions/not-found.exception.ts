import { StatusCodes } from "status-code";
import { BaseException } from "./base.exception.ts";

export class NotFoundException extends BaseException {
  constructor(message?: string, name?: string) {
    super(name ?? "NOT_FOUND", message ?? "Not Found", StatusCodes.NOT_FOUND);
  }
}
