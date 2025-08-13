import { useRouter } from 'next/router';
import usePatients from '@/hooks/usePatients';
import useMedications from '@/hooks/useMedications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
        <Card>
          <CardContent className="p-6">
            Loading patient details...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (patientError || medicationsError) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6 text-red-600">
            Error loading patient details. Please try again later.
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            Patient not found.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Patient Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Medications</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center grid gap-4 grid-cols-4">
            {medications?.map((medication: any) => (
              <Card 
                key={medication.id} 
                className="cursor-pointer hover:bg-gray-100 transition-all duration-300" 
                onClick={() => router.push(`/patients/${patientId}/medications/${medication.id}`)}
              >
                <CardHeader>
                  <CardTitle className="text-gray-700 text-sm">{medication.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-gray-700 text-sm">{medication.description}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end mb-4">
            <Button onClick={() => router.push(`/patients/${patientId}/medications/add-medication`)}>
              Add Medication
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
