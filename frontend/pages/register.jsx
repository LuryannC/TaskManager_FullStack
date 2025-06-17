import { useState } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await API.post("/register", {email, password});
            // Auto login after register
            const res = await API.post("login", {email, password});
            localStorage.setItem("token", res.data.access_token);
            router.push("/tasks");
        } catch (err) {
            alert("Registration failed. Email might be taken.");
        }
    };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}