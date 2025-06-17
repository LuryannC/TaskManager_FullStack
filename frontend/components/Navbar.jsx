import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link>
      {!isLoggedIn && <Link href="/login">Login</Link>}
      {!isLoggedIn && <Link href="/register">Register</Link>}
      {isLoggedIn && <Link href="/tasks">Tasks</Link>}
      {isLoggedIn && <Link href="/create-task">Create Task</Link>}
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}