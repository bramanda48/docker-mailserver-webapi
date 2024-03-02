import { StatusCodes } from "status-code";
import { Handler } from "hono";
import { ResponseFormat } from "../utils/api-response.ts";

const getHello: Handler = (c) => {
  return new ResponseFormat(c)
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(
      {
        hello: "world",
      },
      StatusCodes.OK
    );
};

export const HelloController = { getHello };
