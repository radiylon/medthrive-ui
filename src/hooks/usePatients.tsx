import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Patient } from "@/types";

const getPatientsByCaregiverId = async (caregiverId: string) => {
  const { data } = await api.get(`/caregivers/${caregiverId}/patients`);
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

  const useGetPatientsByCaregiverId = (caregiverId: string) => useQuery<Patient[]>({
    queryKey: ["patients", caregiverId],
    queryFn: () => getPatientsByCaregiverId(caregiverId),
    enabled: !!caregiverId,
  });

  const useGetPatient = (patientId: string) => useQuery<Patient>({
    queryKey: ["patient", patientId],
    queryFn: () => getPatient(patientId),
    enabled: !!patientId,
  });
  
  const useCreatePatient = () => useMutation({
    mutationFn: (patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => createPatient(patient),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["patients", variables.caregiver_id] });
    }
  });

  return {
    useGetPatientsByCaregiverId,
    useGetPatient,
    useCreatePatient
  }
};

export default usePatients;
