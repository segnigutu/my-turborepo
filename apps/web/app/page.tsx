"use client";

import { useState } from "react";
import { Card } from "@repo/ui/card";
import { Navbar } from "@repo/ui/navbar";

type Task = {
  text: string;
  completed: boolean;
};

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

 const toggleTask = (index: number) => {
  setTasks((prevTasks) =>
    prevTasks.map((task, i) =>
      i === index
        ? { ...task, completed: !task.completed }
        : task
    )
  );
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

              <button onClick={() => toggleTask(index)}>
                {t.completed ? "Undo" : "Done"}
              </button>
            </div>
          ))
        )}
      </Card>
    </div>
  );
}