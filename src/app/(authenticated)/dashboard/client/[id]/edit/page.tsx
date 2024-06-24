import UserProfile from "@/components/user-profile";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import ClientStepper from "./client-stepper";

export default async function AddClientPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { step: string };
}) {
  const clientId = Number.parseInt(params.id);
  const currentStep = searchParams.step || "0";

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
      <ClientStepper
        currentStep={Number.parseInt(currentStep)}
        clientId={clientId}
      />
    </div>
  );
}
