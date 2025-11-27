"use client"
import { signIn } from "next-auth/react"

const LoginButton = () => {
    return (
       <button onClick={() => signIn()} className='border-2 border-gray-900 rounded-md px-2 py-1'>Login</button>
    );
};

export default LoginButton;