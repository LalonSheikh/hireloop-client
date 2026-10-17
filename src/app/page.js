import Image from "next/image";
import GlobalReachSection from "./components/GlobalReachSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <GlobalReachSection></GlobalReachSection>
    </div>
  );
}
