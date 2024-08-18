import { registerAs } from "@nestjs/config";
import { config as loadEnvVariables } from "dotenv";
import { env } from "process";
import {
  toBoolValue,
  toNumberValue,
  toStringValue,
} from "../helpers/formatter.helper";
import {
  ApiConf,
  AppConfig,
  DatabaseConf,
  MailConf,
  MailSender,
  MediaStorageConfig,
  SmtpConf,
} from "../types/config-types";
import { loadConfigFile } from "./config-file-loader";
import { formatCorsMethod, formatCorsOrigin } from "./config.helper";

loadEnvVariables();
const { ...appConf } = loadConfigFile();
const { mailer, mediaStorage, database } = appConf;

export default async function buildAppConfig(): Promise<AppConfig> {
  const apiConf: ApiConf = {
    listenPort: toStringValue(env.LISTEN_PORT),
    nodeEnv: toStringValue(env.NODE_ENV),
    apiUrl: toStringValue(env.API_URL),
    corsConfig: {
      allowOrigin: formatCorsOrigin(env.CORS_ALLOWED_ORIGIN),
      allowMethods: formatCorsMethod(env.CORS_ALLOWED_METHOD),
    },
  };

  const isDevEnv = apiConf.nodeEnv === "dev";

  const smtpConf: SmtpConf = {
    host: toStringValue(env.SMTP_HOST),
    port: toNumberValue(env.SMTP_PORT),
    username: toStringValue(env.SMTP_USERNAME),
    password: toStringValue(env.SMTP_PASSWORD),
    secure: toBoolValue(env.SMTP_SECURE_CONNECTION),
  };

  const mailSender: MailSender = {
    name: toStringValue(mailer.senderName),
    email: toStringValue(mailer.senderEmail),
  };

  const mailConf: MailConf = {
    sender: mailSender,
    smtpConf,
  };

  const mediaStorageConfig: MediaStorageConfig = {
    storageDir: toStringValue(mediaStorage.storageDir),
    maxUploadFileSize: toNumberValue(mediaStorage.maxUploadFileSize),
    allowedMediaTypes: Array.from(mediaStorage.allowedMediaTypes).map((type) =>
      toStringValue(type)
    ),
  };

  const appConfig: AppConfig = {
    apiConf,
    isDevEnv,
    mediaStorageConfig,
    mailConf,
  };

  return appConfig;
}

export function buildDatabaseConfig() {
  const databaseConf: DatabaseConf = {
    dbDir: toStringValue(database.dir),
    dbName: toStringValue(database.name),
    isDevEnv: toStringValue(env.NODE_ENV) === "dev",
  };

  return registerAs("dbConfig", () => databaseConf);
}
