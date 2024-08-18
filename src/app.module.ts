import { Logger, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import buildAppConfig from "./common/configuration/config-builder";
import { dataSource } from "./common/database/datasource";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      ignoreEnvVars: true,
      load: [buildAppConfig],
    }),

    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          dataSource,
          manualInitialization: true,
        };
      },
      dataSourceFactory: async () => {
        return new Promise(async (resolve, reject) => {
          const appLog = new Logger("DatabaseModule");
          await dataSource
            .initialize()
            .then((dataSource) => {
              appLog.verbose("database mounted successful");
              resolve(dataSource);
            })
            .catch((error) => {
              appLog.error("failed to mount database", error);
              reject(error);
            });
        });
      },
    }),
  ],
})
export class AppModule {}
