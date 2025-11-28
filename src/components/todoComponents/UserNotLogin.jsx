import React from 'react';
import { AuthHeader } from '../AuthHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import { Button } from '../ui/button';

const UserNotLogin = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <AuthHeader />
          <Card>
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please log in to access the todo app</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                You need to be logged in to manage your tasks. Please log in or register for an account.
              </p>
              <Link href="/login">
                <Button className="w-full">Go to Login Page</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
};

export default UserNotLogin;