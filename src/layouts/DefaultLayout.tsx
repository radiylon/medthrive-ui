import Navbar from "@/components/Navbar";
import useCaregivers from "@/hooks/useCaregivers";
import Loading from "@/components/Loading";
import { CAREGIVER_ID } from "@/constants";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { useGetCaregiverById } = useCaregivers();
  const { data: caregiverData, isLoading } = useGetCaregiverById(CAREGIVER_ID);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Loading />
    </div>
  );

  return (
    <div className="flex flex-col bg-base-200 min-h-screen">
      <Navbar caregiverData={caregiverData} />
      {children}
    </div>
  );
}
