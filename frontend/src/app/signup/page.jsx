"use client";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5277/traveller/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        let isRegister = await response.json();
        if (isRegister) {
          setInfo("Sign Up successful");
        } else {
          setInfo("this email is already registered");
        }
      } else {
        console.error("Sign Up failed");
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
        src="/signup.avif"
        width={500}
        height={500}
        className="ml-[-150px]"
      />

      <div className="bg-slate-100 w-[400px] p-6 rounded-md space-y-9">
        <h1 className="text-3xl">Sign Up</h1>
        <TextField
          id="name"
          label="Name"
          variant="standard"
          className="w-full"
          onChange={(e) => setName(e.target.value)}
        />

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
          Already a member?{" "}
          <Link href="/login" className="text-blue-400 ml-2 ">
            Login now
          </Link>
        </h3>
        <div className="w-full flex justify-end space-x-3">
          <Button variant="outlined" color="error">
            <Link href="/">Cancel </Link>
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Sign Up
          </Button>
        </div>
        {info === "Sign Up successful" ? (
          <p className="text-green-500">{info}</p>
        ) : (
          <p className="text-red-500">{info}</p>
        )}
      </div>
    </form>
  );
}
