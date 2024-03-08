import { StatusCodes } from "status-code";
import { Handler } from "hono";
import { ResponseFormat } from "../../../utils/api-response.ts";
import { AliasService } from "../../../services/account/alias.service.ts";
import { AliasValidation } from "../../../validations/V1/account/alias.validation.ts";

const createAlias: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { emailAlias, emailRecipient } =
    AliasValidation.createAlias.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const aliasService = new AliasService();

  const alias = await aliasService.createAlias(emailAlias, emailRecipient);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(alias, StatusCodes.OK);
};

const removeAlias: Handler = async (c) => {
  const queryParse = c.req.query();
  const { emailAlias, emailRecipient } =
    AliasValidation.removeAlias.parse(queryParse);

  const responseFormat = new ResponseFormat(c);
  const aliasService = new AliasService();

  const alias = await aliasService.removeAlias(emailAlias, emailRecipient);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(alias, StatusCodes.OK);
};

export const AliasController = { createAlias, removeAlias };
