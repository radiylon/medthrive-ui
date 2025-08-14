import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Medication } from "@/types";

const getMedicationsByPatientId = async (patientId: string) => {
  const { data } = await api.get(`/patients/${patientId}/medications`);
  return data;
};

const getMedicationById = async (medicationId: string) => {
  const { data } = await api.get(`/medications/${medicationId}`);
  return data;
};

const createMedication = async (medication: Omit<Medication, 'id' | 'created_at' | 'updated_at'>) => {
  const { data } = await api.post(`/medications`, medication);
  return data;
};

const useMedications = () => {
  const queryClient = useQueryClient();

  const useGetMedicationsByPatientId = (patientId: string) => useQuery({
    queryKey: ["medications", patientId],
    queryFn: () => getMedicationsByPatientId(patientId),
    enabled: !!patientId
  });

  const useGetMedicationById = (medicationId: string) => useQuery({
    queryKey: ["medication", medicationId],
    queryFn: () => getMedicationById(medicationId),
    enabled: !!medicationId
  });

  const useCreateMedication = () => useMutation({
    mutationFn: (medication: Omit<Medication, 'id' | 'created_at' | 'updated_at'>) => createMedication(medication),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["medications", variables.patient_id] });
    }
  });

  return {
    useGetMedicationsByPatientId,
    useGetMedicationById,
    useCreateMedication,
  }
};

export default useMedications;
