import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

const getSchedulesByMedicationId = async (medicationId: string) => {
  const { data } = await api.get(`/medications/${medicationId}/schedules`);
  return data;
};

const getScheduleById = async (scheduleId: string) => {
  const { data } = await api.get(`/schedules/${scheduleId}`);
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

  const useGetScheduleById = (scheduleId: string) => useQuery({
    queryKey: ["schedule", scheduleId],
    queryFn: () => getScheduleById(scheduleId),
  });

  const useMarkScheduleAsTaken = (scheduleId: string) => useMutation({
    mutationFn: () => markScheduleAsTaken(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
    },
  });

  return {
    useGetScheduleByMedicationId,
    useGetScheduleById,
    useMarkScheduleAsTaken,
  }
};

export default useSchedules;
