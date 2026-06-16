import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Пропускаем всё, что не /admin
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    try {
        const res = await fetch(`${API_BASE}/api/user/isadmin`, {
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        });

        if (!res.ok) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        const isAdmin = await res.json();

        if (!isAdmin) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};