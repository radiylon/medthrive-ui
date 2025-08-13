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
      <div className="container mx-auto p-4 text-center">
        <div className="p-6">
          Loading patient details...
        </div>
      </div>
    );
  }

  if (patientError || medicationsError) {
    return (
      <div className="container mx-auto p-4">
        <div className="p-6 text-red-600">
          Error loading patient details. Please try again later.
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto p-4">
        <div className="p-6">
          Patient not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Patient Details</h1>
        <button 
          type="button"
          onClick={() => router.push('/')} 
          className="btn gap-2 w-fit min-w-32 max-w-64 min-h-12 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Patients
        </button>
      </div>
      {/* Patient Details Card */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl justify-center">
            {patient.first_name} {patient.last_name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Date of Birth</h3>
                <p className="font-medium">{new Date(patient.date_of_birth).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Gender</h3>
                <p className="font-medium">{patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Email</h3>
                <p className="font-medium">{patient.email}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Phone</h3>
                <p className="font-medium">{patient.phone_number}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Patient ID</h3>
                <p className="font-medium">{patient.id}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Created at</h3>
                <p className="font-medium">{new Date(patient.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medications Section */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title text-2xl">Medications</h2>
            <button 
              className="btn btn-primary min-w-32 max-w-64 min-h-12 rounded-lg" 
              onClick={() => router.push(`/patients/${patientId}/medications/add-medication`)}
            >
              Add Medication
            </button>
          </div>

          {medications?.length === 0 && (
            <h3 className="text-lg text-center">No medications found</h3>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {medications?.map((medication: any) => (
              <div 
                key={medication.id} 
                className="card bg-base-200 hover:bg-base-300 transition-all cursor-pointer" 
                onClick={() => router.push(`/patients/${patientId}/medications/${medication.id}`)}
              >
                <div className="card-body p-4">
                  <h3 className="card-title text-lg">{medication.name}</h3>
                  <p className="text-sm opacity-70">{medication.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
