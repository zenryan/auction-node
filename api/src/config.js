//@ts-check
const dotenv = require("dotenv");
const path = require("path");

let envFile = "development.env";
const env = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV !== undefined) {
  envFile = env + ".env";
}

dotenv.config({
  path: "environment/" + envFile,
});

const srcConfig = env === 'production'
  // production
  ? {
    folder: 'dist',
    extension: '.js',
  }
  // development
  : {
    folder: 'src',
    extension: '.ts',
  }

/**
 * Set time zone to UTC for native Date.
 * To mimic server time for local development.
 */
// if (process.env.NODE_ENV === "development") process.env.TZ = "UTC";

const root = path.normalize(__dirname + "/..");
const rootPath = process.env.ROOT_PATH || "/";

const config = {
  env,
  debug: process.env.DEBUG === 'TRUE' ? true : false,
  rootPath: process.env.ROOT_PATH || "/",
  // tz: process.env.TZ,
  app: {
    name: "auction",
  },
  // port: Number(process.env.PORT) || 9000,
  database: {
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 33061,
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "koi",
    entities: [`${root}/${srcConfig.folder}/entity/*${srcConfig.extension}`],
    migrations: [`${root}/${srcConfig.folder}/migrations/*${srcConfig.extension}`],
    subscribers: [`${root}/${srcConfig.folder}/subscribers/*${srcConfig.extension}`],
    synchronize: false,
    logging: process.env.DB_LOG == "true" ? true : false,
    charset: "utf8mb4_unicode_ci",
  }
}

module.exports = config;
