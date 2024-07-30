"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();
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
      setError("Password is too short");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return (
      <div>Loading...</div>
    );
  }
  

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="bg-[#ffffff] p-8 rounded-lg shadow-md max-w-lg">
          <h1 className="text-4xl text-gray-950 text-center font-semibold mb-8">Welcome to <span className="text-[#4534AC]" >WorkFlo</span>!</h1>
          <form onSubmit={handleSubmit}>
          {/* <input
              type="text"
              className="w-full border text-black text-sm bg-gray-100 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Full Name"
              required
            /> */}
            <input
              type="text"
              className="w-full border text-black text-sm bg-gray-100  rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Your Email"
              required
            />
            <input
              type="password"
              className="w-full border text-black text-sm bg-gray-100  rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus:text-black"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#766ac4] text-sm text-white py-2 rounded hover:bg-[#5f51b7]"
            >
              {" "}
              Sign Up
            </button>
            <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
          </form>

          <div className="block text-sm text-center text-gray-500 mt-2">
            Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
          </div>
        </div>
      </div>
    )
  );
};

export default Register;