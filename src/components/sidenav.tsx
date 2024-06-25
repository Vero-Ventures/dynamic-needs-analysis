import NavMenu from "./nav-menu";
// import { LogOutIcon } from "lucide-react";

export default function SideNav() {
  return (
    <nav className="z-10 h-14 border-r md:h-auto md:min-h-[calc(100dvh-72px)] md:w-24 lg:w-72">
      <div className="fixed bg-white">
        <div className="flex w-full p-4 md:flex-col">
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}
