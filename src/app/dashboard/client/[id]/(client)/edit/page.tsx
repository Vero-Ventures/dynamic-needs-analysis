import Assets from "./asset/assets";
import Beneficiaries from "./beneficiaries/beneficiaries";
// import EditClientStepper from "./edit-client-stepper";

export default function EditClientDetails() {
  return (
    <div className="space-y-3 p-4">
      {/* <EditClientStepper /> */}
      <Beneficiaries />
      <Assets />
    </div>
  );
}
