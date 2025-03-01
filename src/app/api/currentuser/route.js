
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // Import cookies() for Next.js App Router


export async function GET(request) {
    try {
   // ✅ Await cookies() to get the token
   const cookieStore = await cookies();
   const token = cookieStore.get("jwttoken")?.value;

   
        if (!token) {
            return NextResponse.json({ message: "Unauthorxsxsxssxxsized" }, { status: 401 });
        }

        // Verify and decode token
        const decoded =  jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.json({ extractedEmailFromToken: decoded.mail }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }
}
