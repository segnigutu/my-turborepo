"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Navbar } from "@repo/ui/navbar";

type Task = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔹 Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // 🔹 Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Add task
  const addTask = () => {
  console.log("BUTTON CLICKED"); // 👈 add this

  if (task.trim() === "") return;

  setTasks((prev) => [
    ...prev,
    { text: task, completed: false },
  ]);

  setTask("");
};

  // 🗑 Delete task
  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Toggle complete
  const toggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      <Card>
        <h2>Task Manager</h2>

        <div style={{ marginBottom: "15px" }}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task..."
            style={{
              padding: "10px",
              width: "250px",
              marginRight: "10px",
            }}
          />

          <Button onClick={addTask}>Add Task</Button>
        </div>
      </Card>

      <Card>
        <h3>Task List</h3>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((t, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px",
                border: "1px solid lightgray",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.text}
              </span>

              <div>
                <button
                  onClick={() => toggleTask(index)}
                  style={{ marginRight: "10px" }}
                >
                  {t.completed ? "Undo" : "Complete"}
                </button>

                <button onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}