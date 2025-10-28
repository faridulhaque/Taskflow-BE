import ForgetPassword from "@/components/ForgetPassword";
import Navbar from "@/components/Navbar";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <ForgetPassword />
    </div>
  );
}

export default page;
