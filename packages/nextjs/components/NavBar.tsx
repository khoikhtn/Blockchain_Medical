"use client";

import Link from "next/link";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import { FaucetButton } from "./scaffold-eth";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Technology", href: "/#technology" },
  { name: "Contact", href: "/#contact" },
];

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <img src="/NavBar/medical.png" alt="Logo" className="h-32 ml-28" />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">
          {navigation.map(item => (
            <li key={item.name}>
              <Link href={item.href} className="rounded-md text-3xl font-medium px-20">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex-row space-x-5 mr-4">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </div>
  );
};

export default NavBar;
