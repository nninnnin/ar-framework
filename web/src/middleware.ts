import {
  NextRequest,
  NextResponse,
} from "next/server";
import { randomBytes } from "crypto";

const SESSION_COOKIE = "sandbox_session";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const hasSessionCookie = request.cookies.get(
    SESSION_COOKIE,
  );

  if (!hasSessionCookie) {
    const sessionId = randomBytes(16).toString("hex");

    const key = SESSION_COOKIE;
    const value = sessionId;

    response.cookies.set(key, value, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}
