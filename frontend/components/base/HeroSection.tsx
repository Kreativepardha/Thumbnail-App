import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";


export default function HeroSection (){
    return <div className="w-full h-screen flex flex-col justify-center capitalize">
            <div className="flex  justify-center items-center">
                <Image src="/banner.png" width={600} height={600}alt="Banner_img" />
            </div>
            <div className="flex justify-center items-center flex-col">
                <h1 className="font-extrabold text-6xl md:text-7xl lg:text-9xl  bg-gradient-to-r from-blue-200 to-slate-800 bg-clip-text text-transparent   ">Clash</h1>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Discover the better choice, together .</p>
                <Link href="/login">
                <Button className=" capitalize mt-4 text-lg bg-black text-white hover:bg-yellow-400"> start free    </Button>
                </Link>
            </div>
    </div>
}