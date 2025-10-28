import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="w-full h-20 shadow-xs shadow-[#3B82F6] flex items-center">
      <Image
        className="w-10 ml-10"
        src="/logo.png"
        alt="logo rocket"
        width={40}
        height={40}
      ></Image>
      <h2 className="text-4xl font-extrabold text-white ml-5">
        <span className="text-blue-500">Task</span>

        <span className="text-purple-500">Flow</span>
      </h2>
    </div>
    
  );
}

export default Navbar;
