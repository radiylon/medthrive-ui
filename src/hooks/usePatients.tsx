import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Patient } from "@/types";
import { useToast } from "@/contexts/ToastContext";

const getPatients = async () => {
  const { data } = await api.get('/patients');
  return data;
};

const getPatient = async (patientId: string) => {
  const { data } = await api.get(`/patients/${patientId}`);
  return data;
};

const createPatient = async (patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => {
  const { data } = await api.post("/patients", patient);
  return data;
};

const usePatients = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const useGetPatients = () => useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: () => getPatients(),
  });

  const useGetPatient = (patientId: string) => useQuery<Patient>({
    queryKey: ["patient", patientId],
    queryFn: () => getPatient(patientId),
    enabled: !!patientId,
  });
  
  const useCreatePatient = () => useMutation({
    mutationFn: (patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => createPatient(patient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      showToast({ message: "Patient created successfully", type: "success" });
    }
  });

  return {
    useGetPatients,
    useGetPatient,
    useCreatePatient
  }
};

export default usePatients;
