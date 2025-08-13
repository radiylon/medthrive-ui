import Navbar from "@/components/Navbar";
import useCaregivers from "@/hooks/useCaregivers";

// Hardcoded caregiver_id to represent the Caregiver
const CAREGIVER_ID = "97bca0dd-d50e-4b69-b416-21df0421dc15";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { useGetCaregiverById } = useCaregivers();
  const { data: caregiverData } = useGetCaregiverById(CAREGIVER_ID);

  return (
    <div className="flex flex-col bg-base-200 min-h-screen">
      <Navbar caregiverData={caregiverData} />
      {children}
    </div>
  );
}
