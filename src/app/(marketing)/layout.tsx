"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Footer } from "./footer";
import { useSelectedLayoutSegment } from "next/navigation";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Pricing",
    href: "/#pricing",
  },
];

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="items-center space-x-2 md:flex">
              <span className="text-lg font-bold sm:inline-block">DNA</span>
            </Link>
            {navLinks?.length ? (
              <nav className="gap-6 md:flex">
                {navLinks?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                      item.href.startsWith(`/${segment}`)
                        ? "text-foreground"
                        : "text-foreground/60",
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
          <nav>
            <Link
              href="/dashboard/clients"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
