import NavMenu from "./nav-menu";
// import { LogOutIcon } from "lucide-react";

export default function SideNav() {
  return (
    <nav className="min-h-[calc(100dvh-72px)] w-24 border-r md:w-72">
      <div className="fixed">
        <div className="flex w-full flex-col p-4">
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}
