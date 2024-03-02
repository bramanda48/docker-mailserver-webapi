import { StatusCodes } from "status-code";
import { BaseException } from "./base.exceptions.ts";

export class NotFoundException extends BaseException {
  constructor(name?: string, message?: string) {
    super(name ?? "NOT_FOUND", message ?? "Not Found", StatusCodes.NOT_FOUND);
  }
}
