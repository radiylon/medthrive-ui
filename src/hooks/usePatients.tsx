import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const getPatientsByCaregiverId = async (caregiverId: string) => {
  const { data } = await api.get(`/caregivers/${caregiverId}/patients`);
  return data;
};

const getPatient = async (patientId: string) => {
  const { data } = await api.get(`/patients/${patientId}`);
  return data;
};

const usePatients = () => {
  const useGetPatientsByCaregiverId = (caregiverId: string) => useQuery({
    queryKey: ["patients", caregiverId],
    queryFn: () => getPatientsByCaregiverId(caregiverId),
    enabled: !!caregiverId,
  });

  const useGetPatient = (patientId: string) => useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatient(patientId),
    enabled: !!patientId,
  });

  return {
    useGetPatientsByCaregiverId,
    useGetPatient,
  }
};

export default usePatients;