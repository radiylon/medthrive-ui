import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const CAREGIVER_ID = "123e4567-e89b-12d3-a456-426614174000";

const getPatients = async () => {
  const { data } = await api.get(`/caregivers/${CAREGIVER_ID}/patients`);
  return data;
};

const getPatient = async (patientId: string) => {
  const { data } = await api.get(`/patients/${patientId}`);
  return data;
};

const usePatients = () => {
  const useGetPatients = () => useQuery({
    queryKey: ["patients"],
    queryFn: () => getPatients(),
  });

  const useGetPatient = (patientId: string) => useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => getPatient(patientId),
    enabled: !!patientId,
  });

  return {
    useGetPatients,
    useGetPatient,
  }
};

export default usePatients;