import { connect } from "@/dbConfig/dbConfig"
import User from "@/model/userModel";
import { NextResponse,NextRequest } from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req:NextRequest){
    const reqBody  = await  req.json();
    const {email,password} = reqBody;
    try {
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"User not found"},{status:400});
        }
        //compare password
        const isMatched = await bcryptjs.compare(password,user.password)  
        if (!isMatched){
            return NextResponse.json({message:"invalid email or password"},{status:400});
        }    
        //create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email,
        }
        //create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
        const response =  NextResponse.json({message:"login successful",success:true},{status:200});
        response.cookies.set("token",token,{httpOnly:true});
        return response;
    } catch (error:any) {
        console.log("LOGIN Error",error.message)
        return NextResponse.json({ error: error.message })
    }

   
}