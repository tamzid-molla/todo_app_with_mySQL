"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AddNewTask = () => {
  const [newTodo, setNewTodo] = useState("");
  const session = useSession()

  const addTodo = async() => {
    const email = session?.data?.user?.email;
    try {
       if (newTodo.trim() !== "") {
         const res = await axios.post("/api/add_todo", { email, todo: newTodo });
         setNewTodo("");
         toast.success(res.data.message);
    }
    } catch (error) {
      toast.error("Something went wrong");
    }
   
  };

  return (<>
    <Toaster position='right-top'></Toaster>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
            <CardDescription>Enter a new task below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              />
              <Button onClick={addTodo}>Add</Button>
            </div>
          </CardContent>
        </Card>
    </>
    );
};

export default AddNewTask;
