import React from "react";
import SideNav from "@/components/sidenav";
import UserProfile from "@/components/user-profile";
import { ArrowLeft, PencilIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const clientId = parseInt(params.id);
  const sb = await createClient();
  const { data: client, error } = await sb
    .from("clients")
    .select("id, name")
    .eq("id", clientId)
    .single();
  if (error) {
    throw error;
  }

  if (!client) {
    return notFound();
  }
  return (
    <div>
      <header className="sticky top-0 z-20 bg-secondary p-4 px-10 text-primary-foreground">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
            <div className="text-2xl font-bold">{client.name}</div>
            <Link
              href={`/dashboard/client/${client.id}/edit`}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex items-center gap-2 rounded-xl bg-gray-700 hover:bg-gray-600"
              )}
            >
              <PencilIcon className="h-4 w-4" />
              <span>Edit Details</span>
            </Link>
          </div>
          <UserProfile />
        </div>
      </header>
      <div className="flex flex-col md:flex-row">
        <SideNav />
        <div className="flex-1">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
