import dotenv from "dotenv";
dotenv.config();
export default {
  GMAIL_PASS: "lxideqvkiznxipjs",
  GMAIL_USER: "smooveappro@gmail.com",
  FROM_ADMIN_EMAIL: "smooveappro@gmail.com",
  userSubject: " Welcome To Smooze App!",
  port: 7000,
  BASE_URL: process.env.BASE_URL,
  FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
  DATABASE_URL:
    "postgres://rtajhzcb:vEUxVGeppmcvGoMPCxYsryRU76SGLzy4@ruby.db.elephantsql.com/rtajhzcb",
  APP_SECRETE: "blablabla",
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
};
console.log("running local mode");
