import {Button} from "@/components/ui/button";
import prisma from "@/lib/db";
import { json } from "stream/consumers";

async function Home  () {
  const user = await prisma.user.findMany()
  return <div className="min-h-screen min-w-screen flex items-center justify-center">
     {JSON.stringify(user)}
  </div>
}

export default Home
