import {
  Building2Icon,
  CalculatorIcon,
  CircleUserIcon,
  CreditCardIcon,
  LandmarkIcon,
  LogOutIcon,
  TargetIcon,
  User,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

interface NavLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavLinks: NavLink[] = [
  {
    href: "/client",
    icon: <CircleUserIcon className="mr-3 h-5 w-5" />,
    label: "Client",
  },
  {
    href: "/beneficiaries",
    icon: <Users2Icon className="mr-3 h-5 w-5" />,
    label: "Beneficiaries",
  },
  {
    href: "/businesses",
    icon: <Building2Icon className="mr-3 h-5 w-5" />,
    label: "Businesses",
  },
  {
    href: "/assets",
    icon: <LandmarkIcon className="mr-3 h-5 w-5" />,
    label: "Assets",
  },
  {
    href: "/debts",
    icon: <CreditCardIcon className="mr-3 h-5 w-5" />,
    label: "Debts",
  },
  {
    href: "/goals",
    icon: <TargetIcon className="mr-3 h-5 w-5" />,
    label: "Goals",
  },
  {
    href: "/total-needs",
    icon: <CalculatorIcon className="mr-3 h-5 w-5" />,
    label: "Total Needs",
  },
];

export default function SideNav() {
  return (
    <nav className="flex h-screen w-64 border-r">
      <div className="flex w-full flex-col p-4">
        <div className="mb-8 flex items-center justify-between pl-4">
          <div className="text-3xl font-bold">DNA</div>
          <ModeToggle />
        </div>
        {NavLinks.map((link) => (
          <Link
            href={link.href}
            className="flex items-center rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
        <Link
          href="#"
          className="hover:bg-gray-00 mt-auto flex items-center rounded-lg px-4 py-2 text-sm dark:hover:bg-gray-700"
        >
          <LogOutIcon className="mr-3 h-5 w-5" />
          Log Out
        </Link>
      </div>
    </nav>
  );
}
