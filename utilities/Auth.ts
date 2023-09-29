import { users } from "@prisma/client";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export const sendUserWithToken = (user: users, statusCode: number) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });

  const serialized = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60,
    sameSite: "strict",
    path: "/",
  });

  const { password, ...userWithoutPassword } = user;

  return NextResponse.json(userWithoutPassword, {
    headers: { "Set-Cookie": serialized },
    status: statusCode,
  });
};
