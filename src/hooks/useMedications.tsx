import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Medication } from "@/types";
import { useToast } from "@/contexts/ToastContext";

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

const patchMedication = async (medication: Partial<Medication>) => {
  const { data } = await api.patch(`/medications`, medication);
  return data;
};

const useMedications = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

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
      showToast({ message: "Medication created successfully", type: "success" });
    }
  });

  const usePatchMedication = () => useMutation({
    mutationFn: (medication: Partial<Medication>) => patchMedication(medication),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["medication", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["medications", variables.patient_id]})
      showToast({ message: "Medication updated successfully", type: "success" });
    }
  });

  return {
    useGetMedicationsByPatientId,
    useGetMedicationById,
    useCreateMedication,
    usePatchMedication,
  }
};

export default useMedications;
