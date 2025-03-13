import connect from "@/dbConfig/dbconfig";
import User from "@/models/userModels";
import { NextResponse } from "next/server";

export async function GET(req, res) {

    try {
        await connect()
        const allUser = await User.find()
        // console.log(allUser)
        return NextResponse.json({ message: "Fetching All Users from the Db", extractingAllUsers: allUser })
    } catch (error) {
        return NextResponse.json({ message: "Something Went Wrongs!!" })
    }

}