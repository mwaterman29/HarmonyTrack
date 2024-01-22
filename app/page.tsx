"use client"

import FeelingsWheel from "@/components/FeelingsWheel";
import Image from "next/image";

export default function Home() {
  return (
    <div className='h-screen w-screen'>
    <div className='flex flex-row w-full h-[10%]'>
      <p className='flex h-full items-center text-2xl p-4'>Header</p>
    </div>
    <div className='flex flex-col bg-gray-950 h-[80%] w-full p-6'>
      <p className="p-2 pb-6 w-full text-center text-2xl">How Are You Today?</p>
      <div className='flex h-full'>
        <FeelingsWheel />
      </div>
    </div>
    <div className='h-[10%]'>

    </div>

  </div>
  );
}
