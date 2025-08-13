import usePatients from "@/hooks/usePatients";
import { CAREGIVER_ID } from "@/constants";
import { Patient } from "@/types";
import { useState } from "react";
import Link from "next/link";
import AddPatientModal from "@/components/AddPatientModal";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { useGetPatientsByCaregiverId } = usePatients();
  
  const { data: patients, isLoading } = useGetPatientsByCaregiverId(CAREGIVER_ID);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Patients</h1>
        </div>
        <button className="btn btn-primary min-w-32 max-w-64 min-h-12 rounded-lg" onClick={() => setIsModalOpen(true)}>
          Add Patient
        </button>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-12">
          Loading...
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients?.map((patient: Patient) => (
          <Link key={patient.id} href={`/patients/${patient.id}`}>
            <div className="card flex flex-col min-w-32 max-w-64 bg-base-100 hover:bg-base-100/50 transition-all cursor-pointer items-center justify-center">
              <div className="card-body">
                <h2 className="card-title">
                  {patient.first_name} {patient.last_name}
                </h2>
                <p className="text-sm text-base-content/70">{patient.id}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <AddPatientModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
