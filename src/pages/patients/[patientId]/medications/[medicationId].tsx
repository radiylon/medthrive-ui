import { useRouter } from 'next/router';
import useMedications from '@/hooks/useMedications';
import useSchedules from '@/hooks/useSchedules';
import { useState } from 'react';

export default function MedicationPage() {
  const [scheduleId, setScheduleId] = useState<string | null>(null);
  
  const router = useRouter();
  const { patientId, medicationId } = router.query;
  const { useGetMedicationById } = useMedications();
  const { useGetScheduleByMedicationId } = useSchedules();
  const { useMarkScheduleAsTaken } = useSchedules();

  const { 
    data: medication, 
    isLoading: medicationLoading, 
    error: medicationError 
  } = useGetMedicationById(medicationId as string);

  
  const {
    data: schedule,
    isLoading: scheduleLoading,
    error: scheduleError
  } = useGetScheduleByMedicationId(medicationId as string);

  const { mutate } = useMarkScheduleAsTaken(scheduleId as string);

  const onScheduleClick = (scheduleId: string) => {
    setScheduleId(scheduleId);
    mutate();
  }

  if (medicationLoading || scheduleLoading) {
    return (
      <div className="container mx-auto p-4">
        <div>
          <div className="p-6">
            Loading medication details...
          </div>
        </div>
      </div>
    );
  }

  if (medicationError || scheduleError) {
    return (
      <div className="container mx-auto p-4">
        <div>
          <div className="p-6 text-red-600">
            Error loading medication details. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  if (!medication) {
    return (
      <div className="container mx-auto p-4">
        <div>
          <div className="p-6">
            Medication not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => router.push(`/patients/${patientId}`)}
        >
          ← Back to Patient
        </button>
      </div>

      <div>
        <div>
          <div className="text-2xl font-bold text-center">
            {medication.name}
          </div>
        </div>
        <div className="p-6">
          <div className="text-center grid gap-4 grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Medication ID</h3>
              <p className="text-gray-600">{medication.id}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Description</h3>
              <p className="text-gray-600">{medication.description}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Prescription Quantity</h3>
              <p className="text-gray-600">{medication.quantity} pcs</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Frequency</h3>
              <p className="text-gray-600">{medication.schedule?.frequency}x / {medication.schedule?.type.charAt(0).toUpperCase() + medication.schedule?.type.slice(1)}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Start Date</h3>
              <p className="text-gray-600">{medication.schedule?.start_date?.split('T')[0]}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Created At</h3>
              <p className="text-gray-600">{medication.created_at?.split('T')[0]}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-gray-700">Active</h3>
              <p className="text-gray-600">{medication.is_active ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="text-2xl font-bold text-center">Scheduled Doses</div>
        </div>
        <div className="p-6">
          <div className="text-center grid gap-4 grid-cols-2">
            {schedule?.map((dose: any) => (
              <div 
                key={dose.id} 
                className={`${dose.taken_at ? "bg-green-100" : "bg-red-100"}`}
                onClick={() => onScheduleClick(dose.id)}
              >
                <div className="p-6">
                  <p className="text-gray-600">Scheduled for {dose.scheduled_date.split('T')[0]}</p>
                  <p className="text-gray-600">{dose.taken_at ? `Taken at ${dose.taken_at.split('T')[0]}` : "Not taken"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
