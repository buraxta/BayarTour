import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavigationPage = () => {
  return (
    <div className="flex justify-between items-center absolute bg-slate-50 z-50 w-full top-0 sticky h-15">
      <Link href="/">
        <Image
          src="/logo.png"
          width={150}
          height={150}
          alt="logo"
          className="ml-10"
        />
      </Link>
      <div>
        <ul className="flex space-x-6 text-lg ">
          <li className="hover:bg-cyan-100 p-3 rounded-3xl cursor-pointer">
            <Link href="/tour">Tours</Link>
          </li>
          <li className="hover:bg-cyan-100 p-3 rounded-3xl cursor-pointer">
            Early Reservation
          </li>
          <li className="hover:bg-cyan-100 p-3 rounded-3xl cursor-pointer">
            Campaigns
          </li>
          <li className="hover:bg-cyan-100 p-3 rounded-3xl cursor-pointer">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="hover:bg-cyan-100 p-3 rounded-3xl cursor-pointer">
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex space-x-3 text-lg mr-8">
          <li className="hover:bg-cyan-200 p-3 rounded-3xl cursor-pointer">
            <Link href="/signup">Sign Up</Link>
          </li>
          <li className="hover:bg-cyan-200 p-3 rounded-3xl cursor-pointer">
            <Link href="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationPage;
