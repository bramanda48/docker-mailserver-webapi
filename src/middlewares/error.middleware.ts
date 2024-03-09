import { ErrorHandler, NotFoundHandler } from "hono";
import { ZodError } from "zod";
import { IExceptionMessage, ResponseFormat } from "../utils/api-response.ts";
import { BaseException } from "../exceptions/base.exceptions.ts";
import { BadRequestException } from "../exceptions/bad-request.exception.ts";
import { InternalServerErrorException } from "../exceptions/internal-server.exception.ts";
import { NotFoundException } from "../exceptions/not-found.exception.ts";
import { utils } from "../utils/utils.ts";

export const errorHandler: ErrorHandler = async (err: any, c) => {
  let exception: BaseException;
  const responseFormat = new ResponseFormat<object>(c);
  const errors: IExceptionMessage[] = [];

  let bodyParse: object;
  if (c.req.raw.bodyUsed) {
    bodyParse = await c.req.json();
    bodyParse = !utils.isEmpty(bodyParse) ? bodyParse : undefined;
  }

  let paramParse: object = c.req.param();
  paramParse = !utils.isEmpty(paramParse) ? paramParse : undefined;

  let queryParse: object = c.req.query();
  queryParse = !utils.isEmpty(queryParse) ? queryParse : undefined;

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
  } else if (err instanceof BaseException) {
    exception = err;
    errors.push(new IExceptionMessage(err.codes, err.message, err.stack));
  } else {
    exception = new InternalServerErrorException(err.message);
    errors.push(
      new IExceptionMessage(exception.codes, exception.message, err.stack)
    );
  }
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body: bodyParse,
      params: paramParse,
      query: queryParse,
    })
    .withErrors(errors)
    .json(null, exception.status);
};

export const notFoundHandler: NotFoundHandler = async (c) => {
  const responseFormat = new ResponseFormat<object>(c);
  const exception: BaseException = new NotFoundException();
  const errors: IExceptionMessage[] = [];

  let bodyParse: object;
  if (c.req.raw.bodyUsed) {
    bodyParse = await c.req.json();
    bodyParse = !utils.isEmpty(bodyParse) ? bodyParse : undefined;
  }

  let paramParse: object = c.req.param();
  paramParse = !utils.isEmpty(paramParse) ? paramParse : undefined;

  let queryParse: object = c.req.query();
  queryParse = !utils.isEmpty(queryParse) ? queryParse : undefined;

  errors.push(
    new IExceptionMessage(exception.codes, exception.message, exception.stack)
  );
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
      body: bodyParse,
      params: paramParse,
      query: queryParse,
    })
    .withErrors(errors)
    .json(null, exception.status);
};
