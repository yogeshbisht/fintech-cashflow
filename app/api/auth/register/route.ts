import prismadb from "@/lib/prismadb";
import { sendUserWithToken } from "@/utilities/Auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userObject = await req.json();

    const { email, password, confirmPassword, lastLogin } = userObject;

    if (!email || !password || !confirmPassword || !lastLogin) {
      return new NextResponse("Please provide all credentials", {
        status: 400,
      });
    }

    if (password !== confirmPassword) {
      return new NextResponse("Passwords do not match", { status: 400 });
    }

    const loginType = {
      standard: { status: true },
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prismadb.users.create({
      data: {
        email,
        password: hashedPassword,
        lastLogin,
        loginType,
      },
    });

    return sendUserWithToken(user, 201);
  } catch (error) {
    console.log("[REGISTER_POST_ERROR]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
