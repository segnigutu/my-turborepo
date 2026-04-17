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

  // Load from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add task
  const addTask = () => {
    console.log("BUTTON CLICKED"); // debug

    if (task.trim() === "") return;

    setTasks((prev) => [
      ...prev,
      { text: task, completed: false },
    ]);

    setTask("");
  };

  // Delete task
  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle complete
  const toggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "500px" }}>
        <Navbar />

        <Card>
          <h2 style={{ marginBottom: "15px" }}>Task Manager</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task..."
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "5px",
                border: "none",
              }}
            />

            <Button onClick={addTask}>Add</Button>
          </div>
        </Card>

        <Card>
          <h3 style={{ marginBottom: "10px" }}>Task List</h3>

          {tasks.length === 0 ? (
            <p style={{ color: "gray" }}>No tasks yet</p>
          ) : (
            tasks.map((t, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#1e293b",
                  padding: "10px",
                  borderRadius: "5px",
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
                    style={{
                      marginRight: "8px",
                      padding: "5px 10px",
                    }}
                  >
                    {t.completed ? "Undo" : "Done"}
                  </button>

                  <button
                    onClick={() => deleteTask(index)}
                    style={{
                      padding: "5px 10px",
                      background: "red",
                      color: "white",
                      border: "none",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}