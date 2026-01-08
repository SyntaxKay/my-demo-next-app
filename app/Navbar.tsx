"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { status, data: session } = useSession();
  return (
    <nav className="flex bg-sky-700 p-5">
      <Link href="/" className="mr-5">
        NextJs
      </Link>
      <Link href="/users" className="mr-5 hover:underline">
        User
      </Link>
      <Link href="/product" className="mr-5 hover:underline">
        Product
      </Link>
      {status === "authenticated" && (
        <div className="ml-auto dropdown dropdown-hover">
          <div className="btn m-1">
            {session.user!.name || session.user?.email}
          </div>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <Link href="/changepassword" className="ml-5">
                Change Password
              </Link>
            </li>
            <li>
              <Link href="/api/auth/signout" className="ml-5">
                Signout
              </Link>
            </li>
          </ul>
        </div>
      )}
      {status === "unauthenticated" && (
        <>
          <Link href="/api/auth/signin" className="ml-auto hover:underline">
            Sign In
          </Link>
          <Link href="/register" className="ml-2 hover:underline">
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
