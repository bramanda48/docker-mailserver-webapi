import { Handler, StatusCodes } from "../../../../deps.ts";
import { RestrictionService } from "../../../services/account/restriction.service.ts";
import { ResponseFormat } from "../../../utils/api-response.ts";
import { RestrictionValidation } from "../../../validations/V1/account/restriction.validation.ts";

const getRestriction: Handler = async (c) => {
  const queryParse = c.req.query();
  const { email } = RestrictionValidation.getRestriction.parse(queryParse);

  const responseFormat = new ResponseFormat(c);
  const restrictionService = new RestrictionService();

  const restriction = await restrictionService.getRestriction(email);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(restriction, StatusCodes.OK);
};

const updateRestriction: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { access, email } =
    RestrictionValidation.updateRestriction.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const restrictionService = new RestrictionService();

  const restriction = await restrictionService.updateRestriction(access, email);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(restriction, StatusCodes.OK);
};

const removeRestriction: Handler = async (c) => {
  const queryParse = c.req.query();
  const { access, email } =
    RestrictionValidation.removeRestriction.parse(queryParse);

  const responseFormat = new ResponseFormat(c);
  const restrictionService = new RestrictionService();

  const restriction = await restrictionService.removeRestriction(access, email);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(restriction, StatusCodes.OK);
};

export const RestrictionController = {
  getRestriction,
  updateRestriction,
  removeRestriction,
};
