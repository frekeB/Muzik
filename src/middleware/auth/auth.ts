import { Response, Request, NextFunction } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../../model";
// import UserInstance  from "../../model";
import { UserAttributes } from "../../interface/UserAttributes";
import config from "../../config";
import { UserPayload } from "../../interface";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
};

export const auth = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization as string;
    if (!authorization) {
      throw {
        code: 401,
        message: "Not Authorised",
      };
    }

    const token = authorization.slice(7, authorization.length);
    let verified = jwt.verify(
      token,
      config.APP_SECRETE as string
    ) as UserPayload;

    if (!verified) throw { code: 401, message: "Not Authorised" };

    const { id } = verified as JwtPayload;

    const user = (await UserInstance.findOne({
      where: { id: id },
    })) as unknown as UserAttributes;

    if (!user) throw { code: 400, message: "Invalide Credentials" };
    if (!verified.isLoggedIn) throw { code: 400, message: "Not Authenticated" };
    if (!user.verified) throw { code: 400, message: "Account Not Activated" };
    req.user = verified;
    next();
  } catch (error: Error | any) {
    next({ code: 400, message: error.message });
  }
};
