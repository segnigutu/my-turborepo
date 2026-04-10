"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Navbar } from "@repo/ui/navbar";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

 const addTask = () => {
  if (task.trim() === "") return;
console.log("clicked");
  setTasks((prev) => [...prev, task]);  
  setTask("");
};

  return (
    <div>
      <Navbar />

      <Card>
        <h3>Add Task</h3>

        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          style={{ padding: "10px", margin: "5px" }}
        />

      <Button onClick={addTask}>Add Task</Button>
      </Card>

      <Card>
        <h3>Task List</h3>

        {tasks.map((t, index) => (
          <div key={index}>{t}</div>
        ))}
      </Card>
    </div>
  );
}