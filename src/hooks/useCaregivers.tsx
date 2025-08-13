import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Caregiver } from "@/types";

const getCaregiverById = async (caregiverId: string): Promise<Caregiver> => {
  const { data } = await api.get<Caregiver>(`/caregivers/${caregiverId}`);
  return data;
};

const useCaregivers = () => {
  const useGetCaregiverById = (caregiverId: string) => useQuery<Caregiver>({
    queryKey: ["caregiver", caregiverId],
    queryFn: () => getCaregiverById(caregiverId),
    enabled: !!caregiverId,
  });

  return {
    useGetCaregiverById,
  }
};

export default useCaregivers;
