import { StatusCodes } from "status-code";
import { Handler } from "hono";
import { ResponseFormat } from "../../utils/api-response.ts";
import { EmailService } from "../../services/account/email.service.ts";
import { EmailValidation } from "../../validations/V1/email.validation.ts";

const getAccount: Handler = async (c) => {
  const responseFormat = new ResponseFormat(c);
  const emailService = new EmailService();

  const account = await emailService.getAllAccount();
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
  const { email, password } = EmailValidation.createAcoount.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const emailService = new EmailService();

  const account = await emailService.createAccount(email, password);
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
  const { email, password } = EmailValidation.updatePassword.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const emailService = new EmailService();

  const account = await emailService.updatePassword(email, password);
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
  const { email } = EmailValidation.removeAccount.parse(queryParse);

  const responseFormat = new ResponseFormat(c);
  const emailService = new EmailService();

  const account = await emailService.removeAccount(email);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(account, StatusCodes.OK);
};

export const EmailController = {
  getAccount,
  createAccount,
  updatePassword,
  removeAccount,
};
