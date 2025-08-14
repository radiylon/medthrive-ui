import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useToast } from "@/contexts/ToastContext";

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
  const { showToast } = useToast();

  const useGetSchedulesByMedicationId = (medicationId: string) => useQuery({
    queryKey: ["schedules", medicationId],
    queryFn: () => getSchedulesByMedicationId(medicationId),
  });

  const useMarkScheduleAsTaken = (medicationId: string) => useMutation({
    mutationFn: markScheduleAsTaken,
    onSuccess: (_, scheduleId) => {
      queryClient.invalidateQueries({ queryKey: ["schedule", scheduleId] });
      queryClient.invalidateQueries({ queryKey: ["schedules", medicationId] });
      showToast({ message: "Schedule marked as taken", type: "success" });
    },
  });

  return {
    useGetSchedulesByMedicationId,
    useMarkScheduleAsTaken,
  }
};

export default useSchedules;
