"use client"
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
    return (
        <button onClick={() => signOut()} className='border-2 border-gray-900 rounded-md px-2 py-1'>Log Out</button>
    );
};

export default LogoutButton;
