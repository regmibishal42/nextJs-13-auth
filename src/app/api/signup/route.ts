import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        //check if user exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }
        //hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
 
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            message: "User created successfully"
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message })
    }



}