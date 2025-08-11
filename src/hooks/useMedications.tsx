import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const CAREGIVER_ID = "123e4567-e89b-12d3-a456-426614174000";

const getMedications = async (patientId: string) => {
  const { data } = await api.get(`/patients/${patientId}/medications`);
  return data;
};

const getMedicationById = async (patientId: string, medicationId: string) => {
  const { data } = await api.get(`/patients/${patientId}/medications/${medicationId}`);
  return data;
};

const createMedication = async ({ patientId, medication }: { patientId: string; medication: any }) => {
  const { data } = await api.post(`/patients/${patientId}/medications`, medication);
  return data;
};

const useMedications = () => {
  const useGetMedications = (patientId: string) => useQuery({
    queryKey: ["medications", patientId],
    queryFn: () => getMedications(patientId),
  });

  const useGetMedicationById = (patientId: string, medicationId: string) => useQuery({
    queryKey: ["medication", patientId, medicationId],
    queryFn: () => getMedicationById(patientId, medicationId),
    enabled: !!patientId,
  });

  const useCreateMedication = (patientId: string) => useMutation({
    mutationFn: (medication: any) => createMedication({ patientId, medication }),
  });

  return {
    useGetMedications,
    useGetMedicationById,
    useCreateMedication,
  }
};

export default useMedications;