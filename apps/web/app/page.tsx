"use client";

import { useState, useEffect } from "react";
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
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // 🔹 Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Add task
  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // ✅ Toggle complete
  const toggleTask = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 🗑 Delete task
  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      {/* Add Task */}
      <Card>
        <h3>Add Task</h3>

        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: "10px", marginRight: "10px" }}
        />

        {/* Using native button (stable) */}
        <button onClick={addTask}>Add</button>
      </Card>

      {/* Task List */}
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
                margin: "8px 0",
                padding: "8px",
                background: "#1e293b",
                borderRadius: "5px",
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              <span>{t.text}</span>

              <div>
                <button onClick={() => toggleTask(index)}>
                  {t.completed ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => deleteTask(index)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
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