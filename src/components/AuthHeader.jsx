"use client";

import { Separator } from "@/components/ui/separator";

export function AuthHeader() {
  return (
    <div className="text-center space-y-2 mb-6">
      <div className="flex justify-center mb-4">
        <div className="bg-primary rounded-full p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-foreground"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold">Todo App</h1>
      <Separator className="my-4" />
      <p className="text-muted-foreground">
        Organize your tasks efficiently
      </p>
    </div>
  );
}