import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const getCaregiverById = async (caregiverId: string) => {
  const { data } = await api.get(`/caregivers/${caregiverId}`);
  return data;
};

const useCaregivers = () => {
  const useGetCaregiverById = (caregiverId: string) => useQuery({
    queryKey: ["caregiver", caregiverId],
    queryFn: () => getCaregiverById(caregiverId),
    enabled: !!caregiverId,
  });

  return {
    useGetCaregiverById,
  }
};

export default useCaregivers;
