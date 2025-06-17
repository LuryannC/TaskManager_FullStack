import { useState } from "react";
import { useRouter } from "next/router";
import API from "../utils/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/login", {email, password});
            localStorage.setItem("token", res.data.access_token);
            alert("Logged in!");
            router.push("/tasks");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    )
}