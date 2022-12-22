import express, { Request, Response, NextFunction } from "express";

export const codeError: any = {
  404: "End Of Page",
  401: "Not Authorised",
  500: "Something Went Wronge",
  400: "",
};
export const errorHandler = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(error);
  res
    .status(error.code || 500)
    .json({
      code: error.code,
      error: codeError[`${error.code}`]
        ? codeError[`${error.code}`]
        : error.message,
    });
};

export const errorRouterHandler = express.Router();
errorRouterHandler.all("/*", () => {
  throw { code: 404, message: "End of Page" };
});
