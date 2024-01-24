import FeelingsWheel from "@/components/FeelingsWheel";
import FeelingsInput from "@/components/FeelingsInput";
import FeelingsEmoji from "@/components/FeelingsEmoji";

import Image from "next/image";
import UserControl from "@/components/UserControl";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { FeelingStyle } from "@prisma/client";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const style = session.user.FeelingStyle as FeelingStyle;

  //console.log(session);

  return (
    <div className='h-screen'>
      <div className='flex flex-col bg-gray-950 h-full w-full p-6'>
        <p className="p-2 pb-6 w-full text-center text-2xl">How Are You Today?</p>
        <div className='flex h-full max-h-[640px]'>
          {style == FeelingStyle.WHEEL && <FeelingsWheel />}
          {style == FeelingStyle.EMOJI && <FeelingsEmoji />}
          {style == FeelingStyle.INPUT && <FeelingsInput />}
        </div>
      </div>
    </div>
  );
}
