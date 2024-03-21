import { Handler, StatusCodes } from "../../deps.ts";
import { Fail2banLogs } from "../services/fail2ban/logs.service.ts";
import { LogsValidation } from "../validations/logs.validation.ts";

const getFail2banLogs: Handler = (c) => {
  const bodyParse = c.req.query();
  const { limit } = LogsValidation.getFail2banLogs.parse(bodyParse);

  const logsService = new Fail2banLogs();
  const logs = logsService.getLogs(limit);
  return c.text(logs, StatusCodes.OK);
};

export const LogsController = {
  getFail2banLogs,
};
