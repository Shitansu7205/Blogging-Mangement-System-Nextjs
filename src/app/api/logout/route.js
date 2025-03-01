import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

    // Clear the authentication token by setting an expired cookie
    response.cookies.set("jwttoken", "", {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
        path: "/",
    });

    return response;
}
