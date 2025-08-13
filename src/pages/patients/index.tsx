import usePatients from "@/hooks/usePatients";
import { useRouter } from "next/router";

// Hardcoded caregiver_id to represent the Caregiver
const CAREGIVER_ID = "97bca0dd-d50e-4b69-b416-21df0421dc15";

export default function PatientsPage() {
  const router = useRouter();
  const { useGetPatientsByCaregiverId } = usePatients();
  const { data: patients } = useGetPatientsByCaregiverId(CAREGIVER_ID);

  return (
    <div className="flex flex-col gap-4 m-4">
      <h1 className="text-2xl font-bold">Patients</h1>
      {patients?.map((patient: any) => (
        <div
          key={patient.id}
          className="w-1/4 bg-red-500 p-4 rounded-lg"
          onClick={() => router.push(`/patients/${patient.id}`)}
        >
          <div>
            <h2>{patient.first_name} {patient.last_name}</h2>
            <h3>{patient.email}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
