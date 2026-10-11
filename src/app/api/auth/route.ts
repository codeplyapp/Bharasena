import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Password salah. Silakan coba lagi." },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { message: "Autentikasi berhasil" },
      { status: 200 }
    );

    // Set cookie admin_session (HttpOnly, SameSite=Strict, 7 hari)
    response.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 hari
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat autentikasi." },
      { status: 500 }
    );
  }
}
