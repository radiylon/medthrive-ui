import { Caregiver } from "@/types";
import Link from "next/link";

export default function Navbar({ caregiverData }: { caregiverData?: Caregiver }) {
  return (
    <div className="navbar bg-base-100 shadow-sm border-b-2 border-secondary">
      <div className="flex-1 flex px-8 justify-between">
        <Link href="/" className="text-2xl font-bold text-base-content">MEDTHRIVE</Link>
        {caregiverData?.first_name && caregiverData?.last_name && (
          <div className="text-xl italic text-base-content cursor-pointer">
            <p>{caregiverData.first_name} {caregiverData.last_name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
