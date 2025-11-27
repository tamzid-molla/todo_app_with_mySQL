"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const HomeButton = () => {
    const router = useRouter();
    return (
        <div>
            <button onClick={() => router.push('/')} className='border-2 border-gray-900 rounded-md px-2 py-1'>To Do</button>
        </div>
    );
};

export default HomeButton;