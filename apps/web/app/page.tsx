import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Navbar } from "@repo/ui/navbar";
import { Input } from "@repo/ui/input";

export default function Home() {
  return (
    <div>
      <Navbar />

      <Card>
        <h3>Add Task</h3>
        <Input placeholder="Enter task..." />
        <Button text="Click Me" />
      </Card>
    </div>
  );
}