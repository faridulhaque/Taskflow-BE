import Entry from "@/components/Entry";
import Navbar from "@/components/Navbar";
import React from "react";

function page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] from-30% to-[#334F90] to-100%">
      <Navbar />
      <Entry></Entry>
    </div>
  );
}

export default page;
