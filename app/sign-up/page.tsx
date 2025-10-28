"use client";

import Navbar from "@/components/Navbar";
import SignUp from "@/components/SignUp";

export default function page() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <SignUp></SignUp>
    </div>
  );
}
