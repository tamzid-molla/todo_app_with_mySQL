"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";

const TodoList = ({ filter }) => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // ------------------------------
  // FETCH TODOS FROM API
  // ------------------------------
  const fetchTodos = async () => {
    try {
      const res = await axios.get("/api/add_todo");
      setTodos(res?.data?.todos || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ------------------------------
  // FILTER LOGIC
  // ------------------------------
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return todo.status === "active";
    if (filter === "completed") return todo.status === "completed";
    return true;
  });

  // ------------------------------
  // START EDIT
  // ------------------------------
  const startEditing = (id, todoText) => {
    setEditingId(id);
    setEditText(todoText);
  };

  // ------------------------------
  // SAVE EDIT (API)
  // ------------------------------
  const saveEdit = async () => {
    if (!editText.trim()) return;

    try {
      await axios.put("/api/add_todo", {
        id: editingId,
        todo: editText,
      });

      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, todo: editText } : todo
        )
      );

      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // ------------------------------
  // TOGGLE COMPLETE (API)
  // ------------------------------
  const toggleTodo = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "completed" : "active";

    try {
      await axios.put("/api/update_status", {
        id,
        status: newStatus,
      });

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------------------
  // DELETE TODO (API)
  // ------------------------------
  const deleteTodo = async (id) => {
    try {
      await axios.delete("/api/delete_todo", {
        data: { id },
      });

      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // ------------------------------
  // CLEAR COMPLETED LOCALLY
  // ------------------------------
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => todo.status !== "completed"));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Your Tasks</span>
        </CardTitle>
        <CardDescription>
          {filter === "all"
            ? "All tasks"
            : filter === "active"
            ? "Active tasks"
            : "Completed tasks"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                <Checkbox
                  checked={todo.status === "completed"}
                  onCheckedChange={() =>
                    toggleTodo(todo.id, todo.status)
                  }
                />

                {editingId === todo.id ? (
                  <div className="flex-1 flex gap-2">
                    <Input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                    />
                    <Button size="sm" onClick={saveEdit}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 ${
                        todo.status === "completed"
                          ? "line-through text-gray-500"
                          : ""
                      }`}
                    >
                      {todo.todo}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(todo.id, todo.todo)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No tasks found for selected filter.
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">Total: {todos.length} tasks</p>
        <Button variant="outline" onClick={clearCompleted}>
          Clear Completed
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodoList;
