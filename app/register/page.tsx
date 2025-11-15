"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert(
        "Registration successful! Please check your email to confirm your account."
      );
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-extrabold mb-12 text-center">
        Welcome to Supa Task: Your Task Manager
      </h1>
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password field with show/hide */}
      <div className="relative w-80 mb-2">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="absolute right-3 top-2.5 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      {/* Confirm password field with show/hide */}
      <div className="relative w-80 mb-2">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="border p-2 w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span
          className="absolute right-3 top-2.5 cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>

      <button
        onClick={handleRegister}
        className="bg-green-700 text-white px-4 py-2 mt-2 w-80"
      >
        Sign Up
      </button>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </div>
  );
}
