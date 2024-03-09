import { StatusCodes } from "status-code";
import { Handler } from "hono";
import { ResponseFormat } from "../../../utils/api-response.ts";
import { QuotaValidation } from "../../../validations/V1/account/quota.validation.ts";
import { QuotaService } from "../../../services/account/quota.service.ts";

const updateQuota: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { email, quota } = QuotaValidation.updateQuota.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const quotaService = new QuotaService();

  const quotas = await quotaService.updateQuota(email, quota);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(quotas, StatusCodes.OK);
};

const removeQuota: Handler = async (c) => {
  const queryParse = c.req.query();
  const { email } = QuotaValidation.removeQuota.parse(queryParse);

  const responseFormat = new ResponseFormat(c);
  const quotaService = new QuotaService();

  const account = await quotaService.removeQuota(email);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(account, StatusCodes.OK);
};

export const QuotaController = { updateQuota, removeQuota };
