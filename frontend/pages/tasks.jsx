import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";
import Link from "next/link";

export default function Tasks(){
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    API.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks(res.data))
      .catch(() => {
        alert("Please login again.");
        localStorage.removeItem("token");
        router.push("/login");
      });
  }, []);

  return (
    <div>
      <h1>Your Tasks</h1>
      <Link href="/create-task">
        <button>Create New Task</button>
      </Link>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong><br />
            {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}