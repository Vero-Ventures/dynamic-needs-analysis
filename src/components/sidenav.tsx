import NavMenu from "./nav-menu";
// import { LogOutIcon } from "lucide-react";

export default function SideNav() {
  return (
    <nav className="z-10 hidden min-h-[calc(100dvh-72px)] border-r md:block md:w-24 lg:w-72">
      <div className="fixed">
        <div className="flex w-full flex-col p-4">
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}
