"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DebtForm() {
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="mb-3">
        <CardTitle>Debt</CardTitle>
        <CardDescription>
          Enter your debt to see a clear picture of your financial situation.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="debt-name">Debt name</Label>
            <Input id="debt-name" placeholder="Enter your debt name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <Input id="interest-rate" placeholder="Enter interest rate" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="initial-value">Initial Value ($)</Label>
              <Input id="initial-value" placeholder="Enter initial value" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="year-acquired">Year Acquired</Label>
            <Input id="year-acquired" placeholder="Enter Year acquired" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="term">Term (years)</Label>
            <Input id="term" placeholder="Enter term in years" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="annual-payment">Annual Payment</Label>
            <Input id="annual-payment" placeholder="Enter annual payment" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="current-years-held">Current Years Held</Label>
            <div className="font-bold">3</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount-paid-off">Amount Paid Off ($)</Label>
            <div className="font-bold">$50</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="current-debt-value">
              Current Value of Debt ($)
            </Label>
            <div className="font-bold">$250</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="debt-remaining">Debt Remaining</Label>
            <div className="font-bold">$180</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="years-to-be-paid-off">Years to be Paid Off</Label>
            <div className="font-bold">5</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurable-future-value">
              Insurable Future Value ($)
            </Label>
            <div className="font-bold">$170.20</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-3">
        <div className="flex w-full flex-col gap-3 lg:flex-row">
          <Link href="/dashboard/clients/1/debts" className="w-full">
            <Button variant="outline" type="submit" className="w-full">
              Cancel
            </Button>
          </Link>
          <Link href="/dashboard/clients/1/debts" className="w-full">
            <Button type="submit" className="w-full">
              Save
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
