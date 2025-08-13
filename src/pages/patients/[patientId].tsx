import { useRouter } from 'next/router';
import usePatients from '@/hooks/usePatients';
import useMedications from '@/hooks/useMedications';

export default function PatientPage() {
  const router = useRouter();
  const { patientId } = router.query;
  const { useGetPatient } = usePatients();
  const { useGetMedicationsByPatientId } = useMedications();
  
  const { data: patient, isLoading: patientLoading, error: patientError } = useGetPatient(patientId as string);
  const { data: medications, isLoading: medicationsLoading, error: medicationsError } = useGetMedicationsByPatientId(patientId as string);

  if (patientLoading || medicationsLoading) {
    return (
      <div className="container mx-auto p-4">
        <div>
          <div className="p-6">
            Loading patient details...
          </div>
        </div>
      </div>
    );
  }

  if (patientError || medicationsError) {
    return (
      <div className="container mx-auto p-4">
        <div>
          <div className="p-6 text-red-600">
            Error loading patient details. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto p-4">
        <div>
          <div className="p-6">
            Patient not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div>
        <div>
          <div className="text-2xl font-bold text-center">Patient Details</div>
        </div>
        <div className="p-6">
          <h3 className="text-gray-700 text-center text-2xl font-bold mb-4">{patient.first_name} {patient.last_name}</h3>
          <div className="text-center grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Patient ID</h3>
              <p className="text-gray-600">{patient.id}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Date of Birth</h3>
              <p className="text-gray-600">{patient.date_of_birth.split("T")[0]}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Gender</h3>
              <p className="text-gray-600">{patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Email</h3>
              <p className="text-gray-600">{patient.email}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Phone</h3>
              <p className="text-gray-600">{patient.phone_number}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Created at</h3>
              <p className="text-gray-600">{patient.created_at.split("T")[0]}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="text-2xl font-bold text-center">Medications</div>
        </div>
        <div className="p-6">
          <div className="text-center grid gap-4 grid-cols-4">
            {medications?.map((medication: any) => (
              <div 
                key={medication.id} 
                className="cursor-pointer hover:bg-gray-100 transition-all duration-300" 
                onClick={() => router.push(`/patients/${patientId}/medications/${medication.id}`)}
              >
                <div>
                  <div className="text-gray-700 text-sm">{medication.name}</div>
                </div>
                <div>
                  <h3 className="text-gray-700 text-sm">{medication.description}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mb-4">
            <button type="button" className='btn btn-primary' onClick={() => router.push(`/patients/${patientId}/medications/add-medication`)}>
              Add Medication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
