import Link from "next/link";
import Image from "next/image";

import Logo from "./sl-logo.svg";

export default function Navbar() {
  return (
    <div className="px-8">
      <nav>
        <div className="flex items-center gap-5">
          <Link href="/">
            <Image src={Logo} alt="StudieLedd logo" height={60} quality={100} />
          </Link>
          <Link href="/">
            <h1>StudieLedd</h1>
          </Link>
          <Link href="/about">About</Link>
        </div>

        <div className="flex gap-5">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </nav>
    </div>
  );
}
