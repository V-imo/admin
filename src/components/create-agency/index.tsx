import CreateAgencyForm from "./components/form";

export default function CreateAgency() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Create Agency</h1>

      <CreateAgencyForm />
    </div>
  );
}