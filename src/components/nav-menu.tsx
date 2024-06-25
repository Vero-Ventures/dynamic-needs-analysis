"use client";

import { cn } from "@/lib/utils";
import {
  Building2Icon,
  CircleDollarSignIcon,
  CreditCardIcon,
  HandHeartIcon,
  LandmarkIcon,
  ShieldCheckIcon,
  Users2Icon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

interface NavLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function NavMenu() {
  const params = useParams<{ id: string }>();
  const clientId = parseInt(params.id);
  const NavLinks: NavLink[] = useMemo(
    () => [
      {
        href: `/dashboard/client/${clientId}/income-replacement`,
        icon: <CreditCardIcon className="mr-3 h-5 w-5" />,
        label: "Income Replacement",
      },
      {
        href: `/dashboard/client/${clientId}/beneficiaries`,
        icon: <Users2Icon className="mr-3 h-5 w-5" />,
        label: "Beneficiaries",
      },
      {
        href: `/dashboard/client/${clientId}/businesses`,
        icon: <Building2Icon className="mr-3 h-5 w-5" />,
        label: "Businesses",
      },
      {
        href: `/dashboard/client/${clientId}/assets`,
        icon: <LandmarkIcon className="mr-3 h-5 w-5" />,
        label: "Assets",
      },
      {
        href: `/dashboard/client/${clientId}/debts`,
        icon: <CircleDollarSignIcon className="mr-3 h-5 w-5" />,
        label: "Debts",
      },
      {
        href: `/dashboard/client/${clientId}/goals`,
        icon: <HandHeartIcon className="mr-3 h-5 w-5" />,
        label: "Goals & Philanthropy",
      },
      {
        href: `/dashboard/client/${clientId}/total-insurable-needs`,
        icon: <ShieldCheckIcon className="mr-3 h-5 w-5" />,
        label: "Total Insurable Needs",
      },
    ],
    [clientId]
  );

  const pathname = usePathname();
  return NavLinks.map((link) => {
    const isActive = pathname.includes(link.href);
    return (
      <Link
        key={link.label}
        href={link.href}
        className={cn("flex items-center rounded-lg px-4 py-3", {
          "hover:bg-gray-100 dark:hover:bg-gray-700": !isActive,
          "bg-gray-700 text-primary-foreground dark:bg-gray-100 dark:text-secondary":
            isActive,
        })}
      >
        {link.icon}
        <span className="hidden md:block">{link.label}</span>
      </Link>
    );
  });
}
