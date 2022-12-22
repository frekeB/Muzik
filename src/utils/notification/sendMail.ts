import nodemailer from "nodemailer";
import { response } from "express";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transport.sendMail({
      from: process.env.FROM_ADMIN_EMAIL,
      to,
      subject,
      html,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
