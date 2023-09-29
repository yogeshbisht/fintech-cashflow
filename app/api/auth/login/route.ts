import prismadb from "@/lib/prismadb";
import { sendUserWithToken } from "@/utilities/Auth";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const userObject = await req.json();

    const { email, password, lastLogin, rememberMe } = userObject;

    if (!email || !password || !lastLogin) {
      return new NextResponse("Please provide all credentials", {
        status: 400,
      });
    }

    const user = await prismadb.users.findUnique({
      where: {
        email,
      },
    });

    if (user && !user.loginType.standard.status) {
      return new NextResponse(
        "You have an account created using one of social networks. Please, try to sign in with Google.",
        { status: 401 }
      );
    }

    if (
      !user ||
      !user.password ||
      !bcrypt.compareSync(password, user.password)
    ) {
      return new NextResponse("Incorrect username or password", {
        status: 401,
      });
    }

    await prismadb.users.update({
      where: {
        email,
      },
      data: {
        lastLogin,
      },
    });

    return rememberMe
      ? sendUserWithToken(user, 200)
      : NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    console.log("[REGISTER_POST_ERROR]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
