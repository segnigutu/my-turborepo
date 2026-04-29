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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // 🔹 Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // 🔹 Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ➕ Add task
  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  // ✅ Toggle task
  const toggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // 🗑 Delete task
  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔍 + 🎯 Filter logic
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") return t.completed && matchesSearch;
    if (filter === "pending") return !t.completed && matchesSearch;

    return matchesSearch;
  });

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      {/* Add Task + Search */}
      <Card>
        <h3>Add Task</h3>

        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <button onClick={addTask}>Add</button>

        {/* 🔍 Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          style={{
            padding: "10px",
            marginTop: "10px",
            width: "100%",
          }}
        />

        {/* 🎯 Filter */}
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => setFilter("all")}>All</button>
          <button
            onClick={() => setFilter("completed")}
            style={{ marginLeft: "10px" }}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("pending")}
            style={{ marginLeft: "10px" }}
          >
            Pending
          </button>
        </div>
      </Card>

      {/* Task List */}
      <Card>
        <h3>Task List</h3>

        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((t, index) => (
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