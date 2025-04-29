"use client";
import React, { useState } from "react";
import { Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 text-xl text-white px-4 py-6 mx-auto max-w-3xl rounded-2xl",
        className
      )}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home" />
        </Link>
        <Link href={"/search-hospitals"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Find Hospitals"
          />
        </Link>

        <Link href={"contact"}>
          <MenuItem setActive={setActive} active={active} item="Contact us" />
        </Link>
      </Menu>
    </div>
  );
}

export default Navbar;
