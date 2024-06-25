import NavMenu from "./nav-menu";
// import { LogOutIcon } from "lucide-react";

export default function SideNav() {
  return (
    <nav className="min-h-[calc(100dvh-72px)] w-72 border-r">
      <div className="fixed">
        <div className="flex w-full flex-col p-4">
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}
