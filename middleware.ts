import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";
 
export default async function authMiddleware(request: NextRequest) {
	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		},
	);
 
	if (!session && request.nextUrl.pathname !== "/login") {
		return NextResponse.redirect(new URL("/login", request.url));
	}

    if (session && request.nextUrl.pathname === "/login") {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	return NextResponse.next();
}
 
export const config = {
	matcher: ["/dashboard/:path*", "/login"],
};