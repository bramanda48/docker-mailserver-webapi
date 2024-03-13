import { Handler, StatusCodes } from "../../../../deps.ts";
import { DkimService } from "../../../services/dkim/dkim.service.ts";
import { ResponseFormat } from "../../../utils/api-response.ts";
import { DkimValidation } from "../../../validations/V1/dkim/dkim.validation.ts";

const createKey: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { selector, domain, keytype, keysize } =
    DkimValidation.createKey.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const dkimService = new DkimService();

  const dkim = dkimService.createKey(selector, domain, keytype, keysize);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(dkim, StatusCodes.OK);
};

export const DkimController = {
  createKey,
};
