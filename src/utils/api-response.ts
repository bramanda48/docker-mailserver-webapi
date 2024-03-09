import { StatusCodes } from "status-code";
import { Context } from "hono";

type HeaderRecord = Record<string, string | string[]>;

export class ResponseFormat<T = any> {
  private context: Context;
  private response: {
    statusCode: number;
    data?: T | null;
    errors?: IExceptionMessage[];
    metadata?: IMetadataFormat;
  } = {
    statusCode: StatusCodes.OK,
  };

  constructor(c: Context) {
    this.context = c;
    this.response.metadata = new IMetadataFormat();
  }

  withErrors(errors: IExceptionMessage[]) {
    this.response.errors = errors;
    return this;
  }

  withRequestData(data: IRequestMetadata) {
    if (!this.response.metadata) return this;
    this.response.metadata.request = data;
    return this;
  }

  withPagination(totalData: number, page: number, limit: number) {
    if (!this.response.metadata) return this;

    const totalPage = Math.ceil(totalData / limit);
    page = page < 0 ? 0 : page;

    this.response.metadata.pagination = {
      totalData,
      totalPage,
      limit,
      nextPage: page < totalPage ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    };
    return this;
  }

  json(object: T | null, statusCode: number, headers?: HeaderRecord): Response {
    this.response.statusCode = statusCode ?? StatusCodes.OK;
    this.response.data = object;
    return this.context.json(
      this.response,
      this.response.statusCode as -1,
      headers
    );
  }
}

export class IMetadataFormat {
  request?: IRequestMetadata | null;
  pagination?: IPaginationMetadata | null;

  constructor(request?: IRequestMetadata, pagination?: IPaginationMetadata) {
    this.request = request ?? null;
    this.pagination = pagination ?? null;
  }
}

export interface IRequestMetadata {
  timestamp: Date;
  method: string;
  path: string;
  params?: object | null | unknown;
  query?: object | null | unknown;
  body?: object | null | unknown;
}

export interface IPaginationMetadata {
  limit: number;
  totalData: number;
  totalPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

export class IExceptionMessage {
  private code: string;
  private message: string;
  private stack: string | null = null;

  constructor(code: string, message: string, stack?: string) {
    this.code = code.toUpperCase();
    this.message = message;
    if (stack) this.stack = stack;
  }
}
