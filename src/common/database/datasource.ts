import { join } from "path";
import { cwd } from "process";
import { DataSource } from "typeorm";
import { buildDatabaseConfig } from "../configuration/config-builder";

const conf = buildDatabaseConfig(); // This is an exception
const databaseConf = conf();

export const dataSource = new DataSource({
  // synchronize: databaseConf.isDevEnv, // I keep this line here for the moment;
  synchronize: false, // I'm using migration to update database
  type: "sqlite",
  database: join(cwd(), databaseConf.dbDir, databaseConf.dbName),
  logging: "all",
  logger: "advanced-console",
  entities: [join(__dirname, "../", "/modules/**/*model.js")],
  migrations: [join(__dirname, "..", "migrations/*.js")],
  // Other
});
