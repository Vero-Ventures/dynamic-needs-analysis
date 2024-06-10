import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-6 lg:py-32">
        <div className="container flex max-w-6xl flex-col items-center gap-4 text-center">
          <h1 className="balance text-6xl font-bold">
            The Ultimate Insurance Calculator for Professionals
          </h1>
          <p className="balance sm:text-md my-4 max-w-4xl font-medium leading-normal text-muted-foreground sm:leading-8">
            Streamline your insurance assessments with precision and confidence.
            Our advanced calculator is designed for lawyers and accountants,
            providing accurate and comprehensive solutions for your
            client&apos;s needs.
          </p>
          <div className="space-x-4">
            <Link
              href="/dashboard/clients"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get Started
            </Link>
            <Link
              href="/dashboard/clients"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto mb-14 flex max-w-4xl flex-col items-center space-y-6 text-center">
          <h2 className="text-3xl font-bold leading-[1.1]">
            Everything you need for insurance calcuations.
          </h2>
          <p className="text-md max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
            Our app streamlines the entire calculation process, offering quick,
            accurate results with just a few clicks. Spend less time crunching
            numbers and more time providing valuable insights to your clients.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">
                  Comprehensive Coverage Analysis
                </h3>
                <p className="text-sm text-muted-foreground">
                  Calculate premiums, deductibles, and coverage limits for
                  various insurance policies.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Customizable Inputs</h3>
                <p className="text-sm text-muted-foreground">
                  Tailor calculations based on client-specific information and
                  needs.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Data Security</h3>
                <p className="text-sm text-muted-foreground">
                  Securely store client data with encryption and compliance with
                  data protection laws.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">User-Friendly Interface</h3>
                <p className="text-sm text-muted-foreground">
                  Intuitive and easy-to-navigate design tailored for
                  professionals.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Client Management</h3>
                <p className="text-sm text-muted-foreground">
                  Maintain a database of client information for easy access and
                  management.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Collaboration Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Share calculations and reports with colleagues and clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="pricing"
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <h2 className="text-4xl font-bold">Simple, transparent pricing</h2>
        <p>
          Unlock all features including your own AI assistant for insurance
          advising.
        </p>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              What&apos;s included in the PRO plan
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Unlimited Clients
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> AI Insurance Advisor
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Realtime Dashboard
                Analytics
              </li>
              <li className="flex items-center">
                <CheckIcon className="mr-2 h-4 w-4" /> Premium Support
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$19</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
