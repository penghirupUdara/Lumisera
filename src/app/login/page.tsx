"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <Logo className="scale-90 origin-center" />
          </Link>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-neutral-500 text-center mb-8">Sign in to your dashboard</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-lumisera-600 text-white py-3 rounded-xl font-medium hover:bg-lumisera-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-neutral-500">
          Don't have an account? <Link href="/register" className="text-lumisera-600 font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
