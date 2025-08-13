import useCaregivers from "@/hooks/useCaregivers";
import { useRouter } from "next/router";

// Hardcoded caregiver_id to represent the Caregiver
const CAREGIVER_ID = "97bca0dd-d50e-4b69-b416-21df0421dc15";

export default function HomePage() {
  const router = useRouter();
  const { useGetCaregiverById } = useCaregivers();

  const { data: caregiverData } = useGetCaregiverById(CAREGIVER_ID);
  console.log('caregiverData', caregiverData);

  return (
    <div className="flex flex-col gap-4 m-8 p-4 bg-base-100 rounded-lg">
      <div>
        <h2 className="text-lg font-bold">Caregiver Name</h2>
        <p>{caregiverData?.first_name} {caregiverData?.last_name}</p>
      </div>
      <div>
        <h2 className="text-lg font-bold">Caregiver Email</h2>
        <p>{caregiverData?.email}</p>
      </div>
    </div>
  );
}
