"use client"
import React,{FormEvent, useState} from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter();
    const [user,setUser] = useState({
        email:"",
        password:""
    });
    //login handler
    const onLogin = async (e:FormEvent) =>{
        console.log("User",user)
        e.preventDefault();
        try {
            const response = await axios.post("/api/login",user);
            console.log("Response",response);
            if(response?.data?.status !== 200){
                console.log("Invalid User Name or Password");
                toast(response?.data?.message)
                return
            }
        router.push("/profile")
        } catch (error:any) {
            toast.error(error.message);
            console.log("Login Error",error.message)
        }
    }
  return (
    <div className="h-100vh">
        <h1 className="text-center text-white text-2xl"> Login Page</h1>
        <form className="flex flex-col items-center justify-center min-h-screen py-2" onSubmit={(e)=>onLogin(e)}>
            <hr />
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
            <div className="flex flex-row gap-4 mt-4 ">
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
            <button className="p-2 border border-gray-300 rounded-lg mb-4 mt-4" type="submit">Login</button>
            <Link href="/signup"><p>SignUp</p></Link>
        </form>
    </div>
  )
}

export default Login
