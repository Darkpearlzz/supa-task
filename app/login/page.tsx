"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      router.push("/tasks");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative w-80 mb-2">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 mt-2 w-80"
      >
        Login
      </button>
    </div>
  );
}
