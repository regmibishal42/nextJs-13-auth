"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        username:"",
        email: "",
        password: "",
    });
    const onSignUp = async () => {
        console.log("Signup")
        //basic validation
        if(user.username.length < 1 || user.email.length < 1 || user.password.length <1){
            toast.error("Fill All The Fields")
              console.log("Toast")
            return;
        }
        try {
            const response  = await axios.post("/api/signup",user)
            console.log("Response from user",response.data)
            router.push("/login");
        } catch (error:any) {
            console.log("Error On SignUp",error.message)
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <hr />
            <div className="flex flex-row gap-4 mt-4">
                <label htmlFor="username" className="mt-4">UserName</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg b-4 focus:outline-none focus:border-gray-600 text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                    required
                />
            </div>
            <div className="flex flex-row gap-4 mt-4">
                <label htmlFor="email" className="mt-4">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg b-4 focus:outline-none focus:border-gray-600 ml-8 text-black"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                    required
                />
            </div>
            <div className="flex flex-row gap-4 mt-4">
                <label htmlFor="password" className="mt-4">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg b-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                    required
                />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg mb-4 mt-4" onClick={() => onSignUp()}>SignUp</button>
            <Link href="/login"><p>Already have an Account?Login</p></Link>
        </div>
    )
}

export default SignUpPage
