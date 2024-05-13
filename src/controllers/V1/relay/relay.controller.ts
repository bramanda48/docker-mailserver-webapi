import { Handler, StatusCodes } from "../../../../deps.ts";
import { RelayService } from "../../../services/relay/relay.service.ts";
import { ResponseFormat } from "../../../utils/api-response.ts";
import { RelayValidation } from "../../../validations/V1/relay/relay.validation.ts";

const addAuth: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { domain, username, password } =
    RelayValidation.addAuth.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const relayService = new RelayService();

  const auth = await relayService.addAuth(domain, username, password);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(auth, StatusCodes.OK);
};

const addDomain: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { domain, host, port } = RelayValidation.addDomain.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const relayService = new RelayService();

  const domains = await relayService.addDomain(domain, host, port);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(domains, StatusCodes.OK);
};

const excludeDomain: Handler = async (c) => {
  const bodyParse = await c.req.json();
  const { domain } = RelayValidation.addDomain.parse(bodyParse);

  const responseFormat = new ResponseFormat(c);
  const relayService = new RelayService();

  const exclude = await relayService.excludeDomain(domain);
  return responseFormat
    .withRequestData({
      timestamp: new Date(),
      method: c.req.method,
      path: c.req.path,
    })
    .json(exclude, StatusCodes.OK);
};

export const RelayController = {
  addAuth,
  addDomain,
  excludeDomain,
};
