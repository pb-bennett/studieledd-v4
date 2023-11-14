"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(process.env.NEXT_PUBLIC_API);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        toast.error(data.err);
        setLoading(false);
        return;
      }
      const data = await response.json();
      toast.success(data.success);
      setLoading(false);
      router.push("/login");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error("An error occured, try again.");
    }
  };

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Register new user</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <button
            className="btn-primary1"
            disabled={loading || !name || !email || !password}
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </section>
    </main>
  );
}
