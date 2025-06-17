import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";

export default function CreateTask() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/tasks", { title, description }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Task created!");
      router.push("/tasks");
    } catch (err) {
      alert("Failed to create task.");
    }
  };

    return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <button type="submit">Create</button>
    </form>
  );
}