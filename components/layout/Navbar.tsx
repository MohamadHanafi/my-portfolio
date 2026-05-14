"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LayoutGrid, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navItems = [
  { href: "/about", label: "About", Icon: User },
  { href: "/projects", label: "Projects", Icon: LayoutGrid },
  { href: "/contact", label: "Contact", Icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative mx-auto flex w-full max-w-6xl flex-row items-center justify-between px-4 py-6">
      <div>
        <Link href="/" className="text-xl font-bold">
          Mohamad Hanafi
        </Link>
      </div>
      <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-nav p-1 text-nav-foreground">
        {navItems.map(({ href, label, Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-foreground shadow-sm dark:bg-zinc-800"
                  : "hover:bg-white/60 dark:hover:bg-white/10"
              }`}
            >
              <Icon size={18} strokeWidth={2} />
              {label}
            </Link>
          );
        })}
      </div>
      <div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/MohamadHanafi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground transition hover:opacity-70"
          >
            <FaGithub size={22} />
          </a>

          <a
            href="https://www.linkedin.com/in/mohamadhanafi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground transition hover:opacity-70"
          >
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </nav>
  );
}
