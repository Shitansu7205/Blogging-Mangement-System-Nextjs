import connect from "@/dbConfig/dbconfig";
import User from "@/models/userModels";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        await connect();
        const { mail, password, cpassword } = await req.json();
        // console.log(mail, password, cpassword);

        // Check if password and confirm password match
        if (password !== cpassword) {
            return NextResponse.json({ message: "Password and Confirm Password do not match" }, { status: 400 });
        }

        // Check password length
        if (password.length < 3) {
            return NextResponse.json({ message: "Password must be at least 3 characters" }, { status: 400 });
        }

        // Hash the new password
        const hashPassword = await bcrypt.hash(password, 10);

        // Find the user
        const findUser = await User.findOne({ mail });
        if (!findUser) {
            console.log("User not found");
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update password and save user
        findUser.password = hashPassword;
        await findUser.save();

        return NextResponse.json({ message: "Password reset successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error resetting password:", error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
