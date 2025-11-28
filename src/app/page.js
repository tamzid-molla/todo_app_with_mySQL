"use client"
import UserNotLogin from "@/components/todoComponents/UserNotLogin";
import AddNewTask from "@/components/todoComponents/AddNewTask";
import FilterTodo from "@/components/todoComponents/FilterTodo";
import TodoList from "@/components/todoComponents/TodoList";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default  function Home() {
const session = useSession()
  if (!session) {
    return <UserNotLogin />;
  }

    const [filter, setFilter] = useState("all");
  
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
      <AddNewTask />
      <FilterTodo filter={filter} setFilter={setFilter}/>
      <TodoList filter={filter} setFilter={setFilter}/>
      </div>
    </div>
  );
}
