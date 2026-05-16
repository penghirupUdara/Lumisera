"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, username, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
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
        
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-neutral-500 text-center mb-8">Start your photography business</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Username (Subdomain)</label>
            <div className="flex items-center">
              <input 
                type="text" 
                required
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                className="w-full px-4 py-3 rounded-l-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500" 
                placeholder="yourname"
              />
              <span className="px-4 py-3 bg-neutral-100 border border-l-0 border-neutral-200 rounded-r-xl text-neutral-500 text-sm">
                .lumisera.com
              </span>
            </div>
          </div>
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
            Sign Up
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-neutral-500">
          Already have an account? <Link href="/login" className="text-lumisera-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
