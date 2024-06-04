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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BirthDatePicker } from "@/components/date-picker";

export default function RetirementPlanning() {
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Retirement Planning</CardTitle>
        <CardDescription>
          Enter your information to calculate your retirement income.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <BirthDatePicker />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <div className="font-bold">42</div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="retirement-age">Expected Retirement Age</Label>
            <Input id="retirement-age" placeholder="Enter retirement age" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="active-income">Years of Active Income</Label>
            <div className="font-bold">40</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="province">Province</Label>
            <Select>
              <SelectTrigger id="province">
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ab">Alberta</SelectItem>
                <SelectItem value="bc">British Columbia</SelectItem>
                <SelectItem value="mb">Manitoba</SelectItem>
                <SelectItem value="nb">New Brunswick</SelectItem>
                <SelectItem value="nl">Newfoundland and Labrador</SelectItem>
                <SelectItem value="ns">Nova Scotia</SelectItem>
                <SelectItem value="on">Ontario</SelectItem>
                <SelectItem value="pe">Prince Edward Island</SelectItem>
                <SelectItem value="qc">Quebec</SelectItem>
                <SelectItem value="sk">Saskatchewan</SelectItem>
                <SelectItem value="nt">Northwest Territories</SelectItem>
                <SelectItem value="nu">Nunavut</SelectItem>
                <SelectItem value="yt">Yukon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="annual-income">Annual Income ($)</Label>
            <Input
              id="annual-income"
              type="number"
              min={0}
              pattern="/^\d+(\.\d{1,2})?$/"
              placeholder="Enter your annual income"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="income-multiplier">
              Income Replacement Multiplier
            </Label>
            <Input
              id="income-multiplier"
              type="number"
              min={0}
              placeholder="Enter income replacement multiplier"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="estimated-retirement">
              Amount Insured for Income ($)
            </Label>
            <div className="font-bold">$500,000.00</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax-bracket">Tax Bracket</Label>
            <Select>
              <SelectTrigger id="tax-bracket">
                <SelectValue placeholder="Select tax bracket" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15%</SelectItem>
                <SelectItem value="20">20%</SelectItem>
                <SelectItem value="25">25%</SelectItem>
                <SelectItem value="30">30%</SelectItem>
                <SelectItem value="35">35%</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ml-auto">
          Calculate
        </Button>
      </CardFooter>
    </Card>
  );
}
