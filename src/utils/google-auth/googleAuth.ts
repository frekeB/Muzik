import { Application } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();
import jwt, { JwtPayload } from "jsonwebtoken";
import { v4 as UUID } from "uuid";
import config from "../../config";
import { UserInstance } from "../../model";
import { UserAttributes } from "../../interface";
import {
  // GeneratePassword,
  // GenerateSalt,
  GenerateSignature,
} from "../auth-utils";

export const googleoAuthentry = async (app: Application) => {
  const client = new OAuth2Client({
    clientId:
      config.GOOGLE_CLIENT_ID || (process.env.GOOGLE_CLIENT_ID as string),
    clientSecret:
      config.GOOGLE_CLIENT_SECRET ||
      (process.env.GOOGLE_CLIENT_SECRET as string),
    redirectUri: config.GOOGLE_CALLBACK_URL || process.env.GOOGLE_CALLBACK_URL,
  });
  app.get("/auth/google", (req, res) => {
    const redirect_uri =
      config.GOOGLE_CALLBACK_URL || (process.env.GOOGLE_CALLBACK_URL as string);
    const authUrl = client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      prompt: "consent",
      redirect_uri,
    });
    res.redirect(authUrl);
  });

  app.get("/auth/google/callback", async (req: any, res: any, done) => {
    const { code } = req.query;
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const user = await client.credentials;
    const { id_token } = user;
    //  console.log(id_token)
    const userDataReal = jwt.decode(id_token as string) as JwtPayload;

    // res.json(userDataReal);
    const {
      picture,
      // name,
      email,
      sub,
      given_name,
      email_verified,
    } = JSON.parse(JSON.stringify(userDataReal)) as any;

    // res.json(email)

    let userExist = (await UserInstance.findOne({
      where: {
        email: email,
      },
    })) as unknown as UserAttributes;

    // res.json({
    //   userExist
    // })

    if (!userExist) {
      // const salt = await GenerateSalt();
      // const password = await GeneratePassword(name, salt);
      const uuiduser = UUID();
      let createdUser = (await UserInstance.create({
        id: uuiduser,
        salt: "Googlesalt",
        email,
        password: "Googlepass",
        profileImage: picture,
        googleId: sub,
        userName: given_name,
        verified: email_verified,
      })) as JwtPayload;

      // res.json({
      //   user:createdUser
      // })
      const token = await GenerateSignature({
        id: createdUser.id,
        email: createdUser.email,
        verified: createdUser.verified,
        isLoggedIn: true,
      });
      // res.json(token);
      res.redirect(`${process.env.FRONTEND_BASE_URL}/auth/google/?${token}`);
    } else {
      console.log("login the user if it exists");
      // res.redirect("");
    }

    // console.log("info" + JSON.stringify(userDataReal));

    // Save the user to your database and set a session cookie
    // res.redirect("/");
  });
};
