import FeelingsWheel from "@/components/FeelingsWheel";
import Image from "next/image";
import UserControl from "@/components/UserControl";

export default function Home() {
  return (
    <div className='h-screen'>
      <div className='flex flex-col bg-gray-950 h-full w-full p-6'>
        <p className="p-2 pb-6 w-full text-center text-2xl">How Are You Today?</p>
        <div className='flex h-full max-h-[640px]'>
          <FeelingsWheel />
        </div>
      </div>
    </div>
  );
}
