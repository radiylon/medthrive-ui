import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

const getSchedulesByMedicationId = async (medicationId: string) => {
  const { data } = await api.get(`/medications/${medicationId}/schedules`);
  return data;
};

const markScheduleAsTaken = async (scheduleId: string) => {
  const { data } = await api.patch(`/schedules/${scheduleId}/taken`);
  return data;
};

const useSchedules = () => {
  const queryClient = useQueryClient();

  const useGetScheduleByMedicationId = (medicationId: string) => useQuery({
    queryKey: ["schedules", medicationId],
    queryFn: () => getSchedulesByMedicationId(medicationId),
  });

  const useMarkScheduleAsTaken = (scheduleId: string, medicationId: string) => useMutation({
    mutationFn: () => markScheduleAsTaken(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules", medicationId] });
    },
  });

  return {
    useGetScheduleByMedicationId,
    useMarkScheduleAsTaken,
  }
};

export default useSchedules;