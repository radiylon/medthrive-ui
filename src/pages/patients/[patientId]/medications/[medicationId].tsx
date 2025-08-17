import { useState } from 'react';
import { useRouter } from 'next/router';
import useMedications from '@/hooks/useMedications';
import useSchedules from '@/hooks/useSchedules';
import { Schedule } from '@/types';
import Loading from '@/components/Loading';

export default function MedicationPage() {
  const [pendingScheduleId, setPendingScheduleId] = useState<string | null>(null);
  const router = useRouter();
  const { patientId, medicationId } = router.query;
  const { useGetMedicationById, usePatchMedication } = useMedications();
  const { useGetSchedulesByMedicationId } = useSchedules();
  const { useMarkScheduleAsTaken } = useSchedules();

  const { mutate: patchMedication } = usePatchMedication();

  const { 
    data: medication, 
    isLoading: medicationLoading, 
    error: medicationError 
  } = useGetMedicationById(medicationId as string);

  
  const {
    data: schedules,
    isLoading: schedulesLoading,
    error: schedulesError
  } = useGetSchedulesByMedicationId(medicationId as string);

  const { mutate, isPending } = useMarkScheduleAsTaken(medicationId as string);

  const onScheduleClick = (scheduleId: string) => {
    setPendingScheduleId(scheduleId);
    mutate(scheduleId, {
      onSettled: () => {
        setPendingScheduleId(null);
      }
    });
  }

  const onToggleActive = () => {
    if (medication) {
      patchMedication({
        id: medication.id,
        patient_id: patientId as string,
        is_active: !medication.is_active
      });
    }
  }

  const isLoading = medicationLoading || schedulesLoading;
  const isError = medicationError || schedulesError;

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold">Medication Details</h1>
        <button
          type="button"
          onClick={() => router.push(`/patients/${patientId}`)}
          className="btn gap-1 sm:gap-2 w-fit min-w-fit sm:min-w-32 max-w-64 min-h-8 sm:min-h-12 rounded-lg font-bold text-sm sm:text-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <span className="hidden sm:inline">Back to Patient</span>
          <span className="sm:hidden">Back</span>
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-12 mt-12">
          <Loading />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center h-12 mt-12">
          <p className="text-red-600">Error loading patient details. Please try again later.</p>
        </div>
      )}

      {/* Medication Details */}
      {!isLoading && (
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex-1 text-center">
              <h2 className="card-title text-2xl justify-center">
                {medication?.name}
              </h2>
              <p className="text-sm font-bold text-center text-secondary">Medication ID: {medication?.id}</p>
            </div>
            <button
              onClick={onToggleActive}
              className={`btn btn-md rounded-lg w-full sm:w-auto ${medication?.is_active ? 'btn-error' : 'btn-success'}`}
            >
              {medication?.is_active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Description</h3>
                <p className="font-medium">{medication?.description}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Prescription Quantity</h3>
                <p className="font-medium">{medication?.quantity} pcs</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Frequency</h3>
                <p className="font-medium">{medication?.schedule?.frequency}x / {medication?.schedule?.type.charAt(0).toUpperCase() + medication?.schedule?.type.slice(1)}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Start Date</h3>
                <p className="font-medium">{medication?.schedule?.start_date?.split('T')[0]}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Created At</h3>
                <p className="font-medium">{medication?.created_at?.split('T')[0]}</p>
              </div>
            </div>
            <div className="card bg-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm opacity-70 font-bold">Status</h3>
                <p className="font-medium">{medication?.is_active ? "Active" : "Inactive"}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Scheduled Doses */}
      {!isLoading && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="card-title text-2xl">Scheduled Doses</h2>
              </div>
              <div className="flex items-center gap-2 sm:gap-4 text-sm">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-success/50"></div>
                  <span>Taken</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-base-200"></div>
                  <span>Not Taken</span>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto mt-4 max-h-[32rem] overflow-y-auto">
              <table className="table table-pin-rows">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules?.map((dose: Schedule) => (
                    <tr 
                      key={dose.id}
                      className={`${dose.taken_at ? 'bg-success/10' : ''} hover:bg-base-200/50 transition-all`}
                    >
                      <td className="font-medium">{new Date(dose.scheduled_date).toLocaleDateString()}</td>
                      <td className="italic">{dose.taken_at ? 
                        `Taken on ${new Date(dose.taken_at).toLocaleDateString()}` : 
                        'Not Taken'}</td>
                      <td>
                        {!dose.taken_at && (
                                                      <button 
                              onClick={() => onScheduleClick(dose.id)}
                              className={`btn btn-md ${dose.taken_at ? 'btn-disabled' : 'btn-success'} rounded-lg w-full sm:w-auto text-xs sm:text-sm`}
                              disabled={!!dose.taken_at || pendingScheduleId === dose.id}
                            >
                              {pendingScheduleId === dose.id ? 'Marking...' : 'Mark Taken'}
                            </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
