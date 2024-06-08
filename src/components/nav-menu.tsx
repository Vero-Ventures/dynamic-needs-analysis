"use client";

import { cn } from "@/lib/utils";
import {
  Building2Icon,
  CalculatorIcon,
  CircleUserIcon,
  CreditCardIcon,
  LandmarkIcon,
  TargetIcon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export default function NavMenu() {
  const pathname = usePathname();
  return NavLinks.map((link) => {
    const isActive = pathname.includes(link.href);
    return (
      <Link
        key={link.label}
        href={link.href}
        className={cn("flex items-center rounded-lg px-4 py-2", {
          "hover:bg-gray-100 dark:hover:bg-gray-700": !isActive,
          "bg-gray-700 text-primary-foreground dark:bg-gray-100": isActive,
        })}
      >
        {link.icon}
        {link.label}
      </Link>
    );
  });
}
