import { useState } from "react";
import type { TabProps } from "./types";

export default function Tabs({ tabs, defaultTab }: TabProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? 0);
  return( 
    <div className='flex h-full w-full'>
    {tabs.map(({ name, onClick }, index) => (
    <button
      key={index}
      onClick={() => {
        setActiveTab(index);
        onClick();
      }}
      className={`rounded-t-md w-full h-full max-w-32 flex justify-center items-center text-center border-sky-400 dark:border-sky-700 hover:bg-slate-600/30 ${
        activeTab === index ? 'border-b-4' : 'rounded-b-md'
      }`}>
      {name}
    </button>
  ))}
  </div>
  )
}