import UserProfile from "@/components/user-profile";
import EditClientStepper from "./add-client-stepper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function AddClientPage() {
  return (
    <div className="h-dvh max-h-dvh">
      <header className="bg-secondary p-4 text-primary-foreground">
        <div className="mx-auto flex items-center justify-between md:max-w-screen-xl lg:max-w-screen-2xl">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/clients"
              className={cn(
                buttonVariants({ size: "icon", variant: "secondary" }),
                "rounded-full bg-gray-700 hover:bg-gray-600"
              )}
            >
              <ArrowLeft />
            </Link>
            <div className="text-2xl font-bold">Create a new client</div>
          </div>
          <UserProfile />
        </div>
      </header>
      <EditClientStepper />
    </div>
  );
}