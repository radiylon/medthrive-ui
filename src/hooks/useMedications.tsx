import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const getMedicationsByPatientId = async (patientId: string) => {
  const { data } = await api.get(`/patients/${patientId}/medications`);
  return data;
};

const getMedicationById = async (medicationId: string) => {
  const { data } = await api.get(`/medications/${medicationId}`);
  return data;
};

const createMedication = async (medication: any) => {
  const { data } = await api.post(`/medications`, medication);
  return data;
};

const useMedications = () => {
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
    mutationFn: (medication: any) => createMedication(medication),
  });

  return {
    useGetMedicationsByPatientId,
    useGetMedicationById,
    useCreateMedication,
  }
};

export default useMedications;
