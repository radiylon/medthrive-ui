import { useRouter } from 'next/router';
import useMedications from '@/hooks/useMedications';

export default function NewMedicationPage() {
  const router = useRouter();
  const { patientId } = router.query;
  const { useCreateMedication } = useMedications();

  const { mutate: createMedication, isPending, error } = useCreateMedication();

  const handleAddMedication = () => {
    const testMedication = {
      name: "Tylenol",
      description: "Acetaminophen 500mg",
      quantity: 50,
      schedule: {
        frequency: 2,
        type: "daily",
        start_date: new Date().toISOString().split('T')[0],
      }
    };

    createMedication(
      { patientId: patientId as string, medication: testMedication },
      {
        onSuccess: () => {
          router.push(`/patients/${patientId}`);
        },
        onError: (err) => {
          console.error("Error creating medication:", err);
        }
      }
    );
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => router.push(`/patients/${patientId}`)}
        >
          ← Back to Patient
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddMedication}
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add Test Medication'}
        </button>

        {error && (
          <p className="text-red-500">
            Error: {error instanceof Error ? error.message : 'Failed to create medication'}
          </p>
        )}
      </div>
    </div>
  );
}
