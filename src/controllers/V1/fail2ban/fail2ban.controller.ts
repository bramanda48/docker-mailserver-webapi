import { Handler, StatusCodes } from "../../../../deps.ts";
import { Fail2banService } from "../../../services/fail2ban/fail2ban.service.ts";
import { ResponseFormat } from "../../../utils/api-response.ts";
import { Fail2banValidation } from "../../../validations/V1/fail2ban/fail2ban.validation.ts";

const getJail: Handler = (c) => {
  const responseFormat = new ResponseFormat(c);
  const fail2banService = new Fail2banService();

  const jail = fail2banService.getJail();
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(jail, StatusCodes.OK);
};

const banIpAddress: Handler = (c) => {
  const paramParse = c.req.param();
  const { ip } = Fail2banValidation.banIpAddress.parse(paramParse);

  const responseFormat = new ResponseFormat(c);
  const fail2banService = new Fail2banService();

  const banned = fail2banService.banIpAddress(ip);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(banned, StatusCodes.OK);
};

const unbanIpAddress: Handler = (c) => {
  const paramParse = c.req.param();
  const { ip } = Fail2banValidation.unbanIpAddress.parse(paramParse);

  const responseFormat = new ResponseFormat(c);
  const fail2banService = new Fail2banService();

  const unbanned = fail2banService.unbanIpAddress(ip);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(unbanned, StatusCodes.OK);
};

export const Fail2banController = {
  getJail,
  banIpAddress,
  unbanIpAddress,
};
