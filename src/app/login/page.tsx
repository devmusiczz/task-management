/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      setError("");
      if (res?.url) router.replace("/dashboard");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#ffffff] p-8 rounded-lg shadow-md max-w-lg">
      <h1 className="text-4xl text-gray-950 text-center font-semibold mb-8">Welcome to <span className="text-[#4534AC]" >WorkFlo</span>!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full border text-black text-sm bg-gray-100 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Your email"
            required
          />
          <input
            type="password"
            className="w-full border text-black text-sm bg-gray-100 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#766ac4] text-sm text-white py-2 rounded hover:bg-[#5f51b7]"
          >
            Login
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="block text-sm text-center text-gray-500 mt-2">
            Don't have an account? Create a <Link href="/register" className="text-blue-500 hover:underline">new account</Link>
        </div>

      </div>
    </div>
    )
  );
};

export default Login;
