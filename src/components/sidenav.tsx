import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import NavMenu from "./nav-menu";
// import { LogOutIcon } from "lucide-react";

export default function SideNav() {
  return (
    <nav className="flex h-screen w-64 border-r">
      <div className="flex w-full flex-col p-4">
        <div className="mb-8 flex items-center justify-between pl-4">
          <Link href="/dashboard/clients">
            <span className="text-3xl font-bold">DNA</span>
          </Link>
          <ModeToggle />
        </div>
        <NavMenu />
        {/* <Link
          href="#"
          className="hover:bg-gray-00 mt-auto flex items-center rounded-lg px-4 py-2 text-sm dark:hover:bg-gray-700"
        >
          <LogOutIcon className="mr-3 h-5 w-5" />
          Log Out
        </Link> */}
      </div>
    </nav>
  );
}
