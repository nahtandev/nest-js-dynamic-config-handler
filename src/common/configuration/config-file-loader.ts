import { Logger } from "@nestjs/common";
import { readFileSync } from "fs";
import { join } from "path";
import { isAccessiblePathSync } from "../helpers/fs.helper";
import { KeyObject } from "../types/global-type";

export interface RawConfig {
  mailer: KeyObject;
  database: KeyObject;
  mediaStorage: KeyObject;
}

export function loadConfigFile(): RawConfig {
  const appLog = new Logger("ConfigFileLoader");
  const configFilePath = join(__dirname, "../../../", "config.json");

  if (!isAccessiblePathSync(configFilePath)) {
    appLog.error("error to access config file");
    throw new Error(`error to access config file`);
  }

  const rawData = new Map<string, any>();
  try {
    const content = readFileSync(configFilePath, "utf-8");
    for (const [key, value] of Object.entries(JSON.parse(content))) {
      rawData.set(key, value);
    }

    checkConfigRawData(["mailer", "database", "mediaStorage"], rawData);

    return {
      mailer: rawData.get("mailer"),
      database: rawData.get("database"),
      mediaStorage: rawData.get("mediaStorage"),
    };
  } catch (error) {
    throw new Error(
      `[config-file-reader]: error to load config file. error: ${error}`
    );
  }
}

function checkConfigRawData(keys: string[], configRawData: Map<string, any>) {
  for (const key of keys) {
    if (!configRawData.has(key)) {
      throw new Error(
        `[config-key-checking]: missing config "${key}" in config file`
      );
    }

    if (!configRawData.get(key) === undefined) {
      throw new Error(`[config-check]: config "${key}" has undefined value `);
    }
  }
}
