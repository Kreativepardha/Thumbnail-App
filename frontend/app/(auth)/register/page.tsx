import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";


export default function Login() {
    return (
    <div className="flex justify-center items-center h-screen capitalize ">
            <div className="w-[550px] bg-white rounded-xl py-5 px-10 shadow-md">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent text-center bg-clip-text ">
                        clash
                            </h1>
                    <h1 className="text-3xl font-bold">
                        Login
                            </h1>
                    <p>Welcome TO clash</p>
                    <form >
                    <div className="mt-4">
                                <Label htmlFor="name">name</Label>
                                <Input id="name" type="name" name="name" placeholder="Enter your name .." />
                            </div>
                         <div className="mt-4">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="email" placeholder="Enter your email .." />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="password">password</Label>
                                <Input id="password" type="password" name="password" placeholder="Enter your password .." />
                            </div>
                            <div className="mt-4">
                                <Label htmlFor="cpassword">Confirm password</Label>
                                <Input id="cpassword" type="password" name="password" placeholder="confirm password .." />
                            </div>
                          
                            <div className="mt-4">
                                <Button className="w-full">
                                    Submit
                                </Button>
                            </div>
                    </form>
                   <p className="text-center mt-2 ">
                    Already have an account? 
                        <strong>
                            <Link href="/login" className="ml-2 underline hover:text-blue-500">
                                login
                            </Link>
                        </strong>
                    </p> 
            </div>

    </div>)
}