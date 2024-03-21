import { Handler, StatusCodes } from "../../../../deps.ts";
import { DovecotMasterService } from "../../../services/dovecot/master.service.ts";
import { ResponseFormat } from "../../../utils/api-response.ts";
import { DovecotMasterValidation } from "../../../validations/V1/dovecot/dovecot-master.validation.ts";

const getAccount: Handler = async (c) => {
  const responseFormat = new ResponseFormat(c);
  const dovecotMasterService = new DovecotMasterService();

  const account = await dovecotMasterService.getAllAccount();
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(account, StatusCodes.OK);
};

const createAccount: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { username, password } =
    DovecotMasterValidation.createAcoount.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const dovecotMasterService = new DovecotMasterService();

  const account = await dovecotMasterService.createAccount(username, password);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(account, StatusCodes.OK);
};

const updatePassword: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { username, password } =
    DovecotMasterValidation.updatePassword.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const dovecotMasterService = new DovecotMasterService();

  const account = await dovecotMasterService.updatePassword(username, password);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(account, StatusCodes.OK);
};

const removeAccount: Handler = async (c) => {
  const queryParse = c.req.query();
  const { username } = DovecotMasterValidation.removeAccount.parse(queryParse);

  const responseFormat = new ResponseFormat(c);
  const dovecotMasterService = new DovecotMasterService();

  const account = await dovecotMasterService.removeAccount(username);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(account, StatusCodes.OK);
};

export const DovecotMasterController = {
  getAccount,
  createAccount,
  updatePassword,
  removeAccount,
};
