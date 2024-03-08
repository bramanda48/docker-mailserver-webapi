import { bytes, fs, path, readline } from "../../deps.ts";
import { InternalServerErrorException } from "../exceptions/internal-server.exception.ts";
import { utils } from "../utils/utils.ts";

export enum DatabaseName {
  ACCOUNTS = "postfix-accounts.cf",
  ACCESS_SEND = "postfix-send-access.cf",
  ACCESS_RECEIVE = "postfix-receive-access.cf",
  DOVECOT_MASTERS = "dovecot-masters.cf",
  QUOTA = "dovecot-quotas.cf",
  VIRTUAL = "postfix-virtual.cf",
  PASSWD = "postfix-sasl-password.cf",
  RELAY = "postfix-relaymap.cf",
}

export interface FindOptions {
  split: boolean;
}

export interface FindTextOptions {
  split: boolean;

  // split must be true, if you want to use this option
  findInColumn?: "all" | number;
}

export class DatabaseService {
  private databaseName: string = "";
  private databasePath: string = "";
  private configPath: string = "/tmp/docker-mailserver";

  constructor(name: DatabaseName) {
    this.databaseName = name;
    this.databasePath = path.resolve(`${this.configPath}/${name}`);

    // Create file if not exists
    if (!fs.existsSync(this.databasePath)) Deno.create(this.databasePath);
  }

  public get databaseDelimiter(): string {
    name = this.databaseName;
    if (name == DatabaseName.QUOTA) {
      return ":";
    } else if (
      name == DatabaseName.ACCOUNTS ||
      name == DatabaseName.DOVECOT_MASTERS
    ) {
      return "|";
    } else if (
      name == DatabaseName.PASSWD ||
      name == DatabaseName.RELAY ||
      name == DatabaseName.VIRTUAL
    ) {
      return " ";
    } else if (
      name == DatabaseName.ACCESS_SEND ||
      name == DatabaseName.ACCESS_RECEIVE
    ) {
      return " \t\t ";
    } else {
      throw new InternalServerErrorException(
        `Unsupported DB ${this.databaseName}`
      );
    }
  }

  public async find<T = string[] | string[][]>(
    options?: FindOptions
  ): Promise<T> {
    const getFile = await Deno.readTextFile(this.databasePath);
    const arrayText = getFile.split(/\r?\n/);
    const filteredText = arrayText.filter((text) => !utils.isEmpty(text));

    if (options?.split) {
      return filteredText.map((text) =>
        text.split(this.databaseDelimiter)
      ) as T;
    } else {
      return filteredText as T;
    }
  }

  public async findText<T = string[] | string[][]>(
    text: string,
    options: FindTextOptions = { split: false, findInColumn: "all" }
  ): Promise<T> {
    options.findInColumn =
      !options.findInColumn && options?.findInColumn != 0
        ? "all"
        : options.findInColumn;

    const matches = [];
    const getFile = await Deno.open(this.databasePath, { read: true });

    const encoded = utils.textEncode(text);
    for await (const str of readline(getFile)) {
      if (bytes.indexOfNeedle(str, encoded) >= 0) {
        const decodedText = utils.textDecode(str);
        if (!options?.split) {
          matches.push(decodedText);
          continue;
        }

        const splittedText = decodedText.split(this.databaseDelimiter);
        if (options?.findInColumn !== "all") {
          if (!splittedText[options.findInColumn].includes(text)) {
            continue;
          }
        }
        matches.push(splittedText);
      }
    }
    getFile.close();
    return matches as T;
  }

  public async addOrAppend(...text: string[]): Promise<boolean> {
    const getFile: string[] = await this.find();

    // Check for the line breaks
    const writeText: string[] = [];
    if (getFile.length > 0) {
      const lastText: string = getFile[getFile.length - 1];
      if (!utils.isWithLineBreak(lastText)) {
        writeText.push(...getFile);
        // Empty the file if the last line of text does not have a line break
        await Deno.writeTextFile(this.databasePath, "");
      }
    }

    writeText.push(text.join(this.databaseDelimiter));
    Deno.writeTextFileSync(this.databasePath, writeText.join("\n"), {
      append: true,
      create: true,
    });
    return true;
  }

  public async replace(search: string, ...replace: string[]): Promise<boolean> {
    const getFile = await Deno.readTextFile(this.databasePath);

    Deno.writeTextFileSync(
      this.databasePath,
      getFile.replace(search, replace.join(this.databaseDelimiter))
    );
    return true;
  }

  public async remove(...text: string[]): Promise<boolean> {
    const getFile = await Deno.readTextFile(this.databasePath);

    let replace = "";
    for (const str of text) replace = getFile.split(str).join("");
    Deno.writeTextFileSync(this.databasePath, replace);
    return true;
  }
}
