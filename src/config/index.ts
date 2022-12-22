import dotenv from "dotenv";
dotenv.config();
import merge from "lodash.merge";
//making sure NODE_ENV is set, defult is "developement"
process.env.NODE_ENV = process.env.NODE_ENV || "developement";
//set stage
const stage = process.env.STAGE || "local";
let envConfig;
//dynamically require each config depending on the stage we are in
if (stage === "production") {
  //set config to production
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}
// export along with marge
export default merge(
  {
    //default setting of app in dev
    stage,
    env: process.env.NODE_ENV,
    DATABASE_URL:
      "postgres://rtajhzcb:vEUxVGeppmcvGoMPCxYsryRU76SGLzy4@ruby.db.elephantsql.com/rtajhzcb",
    APP_SECRETE: "blablabla",
    BASE_URL: process.env.BASE_URL,
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
    JWT_SECRETE: "blablabla",
    DATABASE_USERNAME: "rtajhzcb",
    DATABASE_HOST: "ruby.db.elephantsql.com",
    DATABASE_DATABASE_NAME: "rtajhzcb",
    DATABASE_PASSWORD: "vEUxVGeppmcvGoMPCxYsryRU76SGLzy4",
    DATABASE_PORT: 5432,
    GOOGLE_CLIENT_SECRET: "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",
    GOOGLE_CALLBACK_URL: "http://localhost:7000/auth/google/callback",
    GOOGLE_CLIENT_ID:
      "584941865977-6latgkmn2p0mmpr93kgad8k1fr4h5stg.apps.googleusercontent.com",
    secrete: {
      JWT: process.env.JWT_SECRETE,
      dbURL:
        "postgres://rtajhzcb:vEUxVGeppmcvGoMPCxYsryRU76SGLzy4@ruby.db.elephantsql.com/rtajhzcb",
    },
  },
  envConfig
);
