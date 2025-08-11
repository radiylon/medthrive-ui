import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import useMedications from '@/hooks/useMedications';

export default function NewMedicationPage() {
  const router = useRouter();
  const { patientId } = router.query;
  const { useCreateMedication } = useMedications();

  const { mutate: createMedication, isPending, error } = useCreateMedication(patientId as string);

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
        <Button
          variant="outline"
          onClick={() => router.push(`/patients/${patientId}`)}
        >
          ← Back to Patient
        </Button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Button 
          onClick={handleAddMedication}
          disabled={isPending}
        >
          {isPending ? 'Adding...' : 'Add Test Medication'}
        </Button>

        {error && (
          <p className="text-red-500">
            Error: {error instanceof Error ? error.message : 'Failed to create medication'}
          </p>
        )}
      </div>
    </div>
  );
}
