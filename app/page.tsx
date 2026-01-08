import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";
import women from "@/public/woman.png";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  return (
    <>
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="/users">Users</Link>
      <Image
        src={session ? session.user!.image! : women}
        alt={session ? session.user!.name! : "Profile Photo"}
        width={200}
        height={200}
        
      />
    </>
  );
}
