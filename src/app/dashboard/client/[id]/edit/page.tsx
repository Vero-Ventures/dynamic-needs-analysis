import Assets from "./(asset)/assets";
import Beneficiaries from "./(beneficiaries)/beneficiaries";
import { IncomeReplacementForm } from "./(client)/income-replacement-form";
import { DebtForm } from "./(debt)/debt-form";
import GoalsAndPhilanthropy from "./(goals-and-philanthropy)/goals-and-philanthropy";
import { KeyPersonForm } from "./(key-person)/key-person-form";
import Shareholders from "./(shareholders)/shareholders";
// import EditClientStepper from "./edit-client-stepper";

export default function EditClientDetails() {
  return (
    <div className="space-y-3 p-4">
      {/* <EditClientStepper /> */}
      <Beneficiaries />
      <Assets />
      <IncomeReplacementForm />
      <DebtForm />
      <Shareholders />
      <KeyPersonForm />
      <GoalsAndPhilanthropy />
    </div>
  );
}
