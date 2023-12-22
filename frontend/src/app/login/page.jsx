"use client";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { cx } from "../tour/context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const router = useRouter();
  const { globalState, setGlobalState } = useContext(cx);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setInfo("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5277/traveller/login", {
        method: "POST",
        mode: "cors", // Cors hatasını önlemek için
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        let isLogin = await response.json();
        if (isLogin.isSuccess) {
          setGlobalState(isLogin.id);
          setInfo("Login successful");
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          setInfo("Email or password is wrong");
        }
      } else {
        setInfo("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      className="flex items-center justify-center space-x-28 "
      style={{ height: "calc(100vh - 200px)" }}
      onSubmit={handleSubmit}
    >
      <Image
        src="/login.jpg"
        width={500}
        height={500}
        className="ml-[-150px]"
      />

      <div className="bg-slate-100 w-[400px] p-6 rounded-md space-y-9">
        <h1 className="text-3xl">Login</h1>
        <TextField
          id="email"
          label="Email"
          variant="standard"
          className="w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          className="w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <h3>
          Not a member?{" "}
          <Link href="/signup" className="text-blue-400 ml-2 ">
            Signup now
          </Link>
        </h3>
        <div className="w-full flex justify-end space-x-3">
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Login
          </Button>
        </div>
        {info === "Login successful" ? (
          <p className="text-green-500">{info}</p>
        ) : (
          <p className="text-red-500">{info}</p>
        )}
      </div>
    </form>
  );
}
