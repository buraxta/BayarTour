"use client";
import { Button, Paper, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegAddressBook } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setInfo("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5277/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        let messageSaved = await response.json();
        if (messageSaved) {
          setInfo("Message sent");
        } else {
          setInfo("Message not sent");
        }
      } else {
        console.error("Message could not be sent");
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
      <div className="flex flex-col items-center justify-center space-y-4">
        <Image src="/contact.gif" width={400} height={400} className="mb-2" />
        <Paper className="w-[400px]  p-6 rounded-md space-y-9" elevation={6}>
          <ul className="space-y-6">
            <li className="flex">
              <FaRegAddressBook className="mr-2 text-xl" />
              Şehit Prof. Dr. İlhan Varank Kampüsü, 45140 Yunusemre/Manisa
            </li>
            <li className="flex">
              <BsTelephone className="mr-2 text-xl" />
              555-555-5555
            </li>
            <li className="flex">
              <MdOutlineMail className="mr-2 text-xl" />
              info@bayartour.com
            </li>
          </ul>
        </Paper>
      </div>

      <div className="bg-slate-100 w-[400px] p-6 rounded-md space-y-9">
        <h1 className="text-3xl">Contact Us</h1>
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
          id="message"
          label="Message"
          variant="standard"
          className="w-full"
          multiline
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />

        <div className="w-full flex justify-end space-x-3">
          <Button variant="outlined" color="error">
            <Link href="/">Cancel</Link>
          </Button>
          <Button type="submit" variant="outlined" color="primary">
            Send
          </Button>
        </div>
        {info === "Message sent" ? (
          <p className="text-green-500">{info}</p>
        ) : (
          <p className="text-red-500">{info}</p>
        )}
      </div>
    </form>
  );
}
