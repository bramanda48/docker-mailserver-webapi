import { NotFoundException } from "../../exceptions/not-found.exception.ts";
import { Alias } from "../../models/alias.model.ts";
import { utils } from "../../utils/utils.ts";
import { BaseService } from "../base.service.ts";

export class AliasService extends BaseService {
  public async getAlias(email: string): Promise<Alias[]> {
    const alias: Alias[] = [];
    const getAlias: string[] = await this.dbVirtual.findText(email, {
      split: true,
    });

    for (const [emailAlias] of getAlias) {
      alias.push(new Alias(emailAlias));
    }
    return alias;
  }

  public async createAlias(
    emailAlias: string,
    emailRecipient: string[]
  ): Promise<Alias> {
    const getAlias: string[][] = await this.dbVirtual.findText(emailAlias, {
      split: true,
      findInColumn: 0,
    });

    let newRecipient: string[] = [];
    if (getAlias.length > 0) {
      // update recipient
      const [, oldRecipient] = getAlias[0];

      const delimiter: string = this.dbVirtual.databaseDelimiter;
      const search: string = getAlias[0].join(delimiter);

      newRecipient = utils.arrayMerge(oldRecipient.split(","), emailRecipient);
      this.dbVirtual.replace(search, emailAlias, newRecipient.join(","));
    } else {
      // add new alias
      newRecipient = emailRecipient;
      this.dbVirtual.addOrAppend(emailAlias, newRecipient.join(","));
    }

    return new Alias(emailAlias, newRecipient);
  }

  public async removeAlias(
    emailAlias: string,
    emailRecipient: string
  ): Promise<Alias> {
    const getAlias: string[][] = await this.dbVirtual.findText(emailAlias, {
      split: true,
      findInColumn: 0,
    });
    if (getAlias.length == 0) {
      throw new NotFoundException("Mail alias does not exist");
    }
    const [, oldRecipient] = getAlias[0];

    const delimiter: string = this.dbVirtual.databaseDelimiter;
    const search: string = getAlias[0].join(delimiter);

    const newRecipient: string[] = oldRecipient
      .split(",")
      .filter((recipient) => recipient != emailRecipient);

    if (!utils.isEmpty(newRecipient)) {
      // update recipient
      await this.dbVirtual.replace(search, emailAlias, newRecipient.join(","));
    } else {
      // delete alias
      await this.dbVirtual.remove(search);
    }
    return new Alias(emailAlias, newRecipient);
  }
}
