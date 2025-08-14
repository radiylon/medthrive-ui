import { useState } from "react";
import { useRouter } from "next/router";
import { Medication } from "@/types";
import useMedications from "@/hooks/useMedications";

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData: Omit<Medication, 'id' | 'created_at' | 'updated_at'> = {
  patient_id: "",
  name: "",
  is_active: true,
  description: "",
  quantity: 0,
  schedule: {
    frequency: 2,
    type: "daily",
    start_date: null
  }
};

export default function AddMedicationModal({ isOpen, onClose }: AddMedicationModalProps) {
  const [formData, setFormData] = useState(initialFormData);

  const router = useRouter();
  const { patientId } = router.query;

  const { useCreateMedication } = useMedications();
  const { mutate: createMedication } = useCreateMedication();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createMedication({ ...formData, patient_id: patientId as string });
    onClose();
    setFormData(initialFormData);
  };

  if (!isOpen) return null;

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-4xl w-full">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <h3 className="font-bold text-2xl mb-4 text-center">Add New Medication</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Medication Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={formData.description || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Medication Quantity</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={formData.quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Dosage Frequency (example: 2 times/day)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={formData.schedule.frequency}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, schedule: { ...formData.schedule, frequency: parseInt(e.target.value) } })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Start Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={formData.schedule.start_date ? new Date(formData.schedule.start_date).toISOString().split('T')[0] : ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, schedule: { ...formData.schedule, start_date: new Date(e.target.value) } })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.schedule.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, schedule: { ...formData.schedule, type: e.target.value as "daily" | "weekly" } })}
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div className="modal-action flex justify-end gap-2 mt-8 col-span-2">
            <button type="button" className="btn btn-outline hover:bg-base-200/50 min-w-32 max-w-64 min-h-12 rounded-lg" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary min-w-32 max-w-64 min-h-12 rounded-lg">Add Medication</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
