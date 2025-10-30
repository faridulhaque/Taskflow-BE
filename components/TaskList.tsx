"use client";
import { useGetAllTasksQuery } from "@/services/queries/othersApi";
import React from "react";

export default function TaskList() {
  const {
    data: tasks,

    isLoading,
  } = useGetAllTasksQuery("");

  return (
    <div className="w-full flex flex-col items-center px-4 space-y-10">
      <div className="relative w-full h-12 md:w-2/3 lg:w-2/5 mt-16">
        <input
          type="text"
          name="title"
          placeholder="Search"
          className="w-full h-full rounded-lg bg-[#F7F7F7] border border-[#BCBCBC] pl-10 pr-4 outline-0 text-black placeholder-gray-500"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="gray"
          className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      <div className="w-full md:w-2/3 lg:w-2/5 bg-white rounded-md shadow-md py-4 px-3 md:px-5">
        <div className="flex items-center justify-between bg-[#F7F7F7] rounded-md px-3 py-2">
          <div className="flex items-start space-x-3">
            <div className=" bg-green-400 w-4 h-4 mt-1 rounded-sm cursor-pointer"></div>
            {/* <div className="border-2 border-[#BCBCBC] w-4 h-4 mt-1 rounded-sm cursor-pointer"></div> */}
            <div>
              <p className="text-md text-black">Lorem ipsum dolor sit amet.</p>
              <p className="text-sm text-gray-500 mt-1">
                12:30 PM • 28 Oct 2025
              </p>
            </div>
          </div>
          <button className="text-red-500 text-lg font-semibold hover:text-red-600 transition mb-8 cursor-pointer">
            ✕
          </button>
        </div>
      </div>

      <div className="w-full md:w-2/3 lg:w-2/5 bg-white rounded-md shadow-sm p-4">
        <h2 className="text-lg font-medium text-black mb-3">Progress</h2>

        <div className="flex justify-center items-center">
          <div className="w-full h-3 bg-[#385682] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: "60%", backgroundColor: "#3B82F6" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
