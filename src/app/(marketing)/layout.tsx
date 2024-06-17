import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Footer } from "./footer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Navbar from "./navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const { isAuthenticated } = getKindeServerSession();
  const userAuthenticated = await isAuthenticated();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="items-center space-x-2 md:flex">
              <span className="text-lg font-bold sm:inline-block">DNA</span>
            </Link>
            <Navbar />
          </div>
          <nav>
            {userAuthenticated ? (
              <Link href="/dashboard/clients" className={cn(buttonVariants())}>
                Dashboard
              </Link>
            ) : (
              <LoginLink
                postLoginRedirectURL="/dashboard/clients"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4"
                )}
              >
                Login
              </LoginLink>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
