
import { NextResponse } from "next/server";

export function middleware(request) {

    const token = request.cookies.get("jwttoken")?.value;

    // console.log(token)

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    else {
        return NextResponse.next()
    }

}



export const config = {
    matcher: ["/blogs", "/blogpost","/profile"]
}