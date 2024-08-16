import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function NotFound() {
    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <h2 className="font-extrabold text-3xl bg-gradient-to-t from-pink-900 to-red-400 text-transparent bg-clip-text">!!Not Found!!</h2>
            <Image  src="/notfound.webp" width={600} height={600} alt="error"></Image>
            <Link href="/">
                <Button>
                    return home
                </Button>
            </Link>

        </div>
    )
}