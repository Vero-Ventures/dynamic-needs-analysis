import UserProfile from "@/components/user-profile";
import EditClientStepper from "./edit-client-stepper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function EditClientDetails() {
  return (
    <div className="h-dvh max-h-dvh">
      <header className="bg-primary p-4 text-primary-foreground">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className={cn(
                buttonVariants({ size: "icon", variant: "secondary" }),
                "rounded-full"
              )}
            >
              <ArrowLeft />
            </Link>
            <div className="text-2xl font-bold">Edit Client Details</div>
          </div>
          <UserProfile />
        </div>
      </header>
      <EditClientStepper />
    </div>
  );
}
