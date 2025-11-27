"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
const RegisterButton = () => {
    const router = useRouter();
    
    return (
        <div>
            <button onClick={() => router.push('/register')} className='border-2 border-gray-900 rounded-md px-2 py-1'>Register</button>
        </div>
    );
};

export default RegisterButton;