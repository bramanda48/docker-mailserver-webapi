import { StatusCodes } from "status-code";
import { ErrorHandler, NotFoundHandler } from "hono";
import { ZodError } from "zod";
import { IExceptionMessage, ResponseFormat } from "../utils/api-response.ts";
import { BaseException } from "../exceptions/base.exceptions.ts";
import { BadRequestException } from "../exceptions/bad-request.exception.ts";
import { InternalServerErrorException } from "../exceptions/internal-server.exception.ts";
import { NotFoundException } from "../exceptions/not-found.exception.ts";

const genericJSONErrMsg = "Unexpected end of JSON input";
export const errorHandler: ErrorHandler = async (err: any, c) => {
  let exception: BaseException;
  const responseFormat = new ResponseFormat<object>(c);
  const errors: IExceptionMessage[] = [];
  const bodyParse: object = c.req.method !== "GET" ? await c.req.json() : {};

  if (err instanceof ZodError) {
    exception = new BadRequestException();
    err.errors.forEach((x) =>
      errors.push(
        new IExceptionMessage(
          "VALIDATION_ERROR",
          `Value of ${x.path} ~ ${x.message}`,
          exception.stack
        )
      )
    );
  } else {
    if (err instanceof SyntaxError && err.message.includes(genericJSONErrMsg)) {
      exception = new BaseException(
        "SYNTAX_ERROR",
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else if (err.name.includes("PrismaClient")) {
      exception = new InternalServerErrorException(err.message);
    } else {
      exception = err;
    }
    errors.push(
      new IExceptionMessage(exception.codes, exception.message, exception.stack)
    );
  }
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body: bodyParse,
      params: c.req.param(),
      query: c.req.query(),
    })
    .withErrors(errors)
    .json(null, exception.status);
};

export const notFoundHandler: NotFoundHandler = async (c) => {
  const responseFormat = new ResponseFormat<object>(c);
  const exception: BaseException = new NotFoundException();
  const errors: IExceptionMessage[] = [];
  const bodyParse: object = c.req.method !== "GET" ? await c.req.json() : {};

  errors.push(
    new IExceptionMessage(exception.codes, exception.message, exception.stack)
  );
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body: bodyParse,
      params: c.req.param(),
      query: c.req.query(),
    })
    .withErrors(errors)
    .json(null, exception.status);
};
