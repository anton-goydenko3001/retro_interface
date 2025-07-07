import { type NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/auth-mysql";
import { Database } from "@/lib/mysql";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username, fullName } = body;

    // Валидация
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Регистрация пользователя
    const authResult = await AuthService.signUp(
      email,
      password,
      username,
      fullName
    );

    // Логируем активность
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    await Database.logActivity(
      authResult.user.id,
      "user_signup",
      "user",
      authResult.user.id,
      { email, username },
      clientIP,
      userAgent
    );

    // Устанавливаем cookie с токеном
    const response = NextResponse.json(
      {
        user: {
          id: authResult.user.id,
          email: authResult.user.email,
          username: authResult.user.username,
          full_name: authResult.user.full_name,
          role: authResult.user.role,
        },
      },
      { status: 201 }
    );

    response.cookies.set("auth-token", authResult.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 дней
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
