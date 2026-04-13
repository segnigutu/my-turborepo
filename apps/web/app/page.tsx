"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Navbar } from "@repo/ui/navbar";

type Task = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    { text: "Study React", completed: false },
    { text: "Finish assignment", completed: true },
  ]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks((prev) => [
      ...prev,
      { text: task, completed: false },
    ]);

    setTask("");
  };

  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

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

        {tasks.map((t, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid lightgray",
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
        ))}
      </Card>
    </div>
  );
}