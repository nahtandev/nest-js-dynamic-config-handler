import { Algorithm as JwtAlgorithm } from "jsonwebtoken";
import { Transporter } from "nodemailer";
import { JwtBlackList } from "./jwt-blacklist";

export interface AppConfig {
  apiConf: ApiConf;
  isDevEnv: boolean;
  mediaStorageConfig: MediaStorageConfig;
  mailConf: MailConf;
}

export interface DatabaseConf {
  dbDir: string;
  dbName: string;
  isDevEnv: boolean;
}

export interface ApiConf {
  listenPort: string;
  nodeEnv: string;
  apiUrl: string;
  corsConfig: CorsConfig;
}

export interface CorsConfig {
  allowOrigin: string[];
  allowMethods: string[];
}

export interface MediaStorageConfig {
  storageDir: string;
  maxUploadFileSize: number;
  allowedMediaTypes: string[];
}

export interface MailConf {
  sender: MailSender;
  smtpConf: SmtpConf;
}

export interface SmtpConf {
  host: string;
  port: number;
  username: string;
  password: string;
  secure: boolean;
}

export interface MailSender {
  name: string;
  email: string;
}
