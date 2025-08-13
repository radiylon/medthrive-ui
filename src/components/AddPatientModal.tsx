import { useState } from "react";
import usePatients from "@/hooks/usePatients";
import { CAREGIVER_ID } from "@/constants";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPatientModal({ isOpen, onClose }: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone_number: "",
    gender: "",
  });

  const { useCreatePatient } = usePatients();
  const { mutate: createPatient } = useCreatePatient();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPatient({ ...formData, caregiver_id: CAREGIVER_ID });
    onClose();
    setFormData({
      first_name: "",
      last_name: "",
      date_of_birth: "",
      email: "",
      phone_number: "",
      gender: "",
    });
  };

  if (!isOpen) return null;

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <h3 className="font-bold text-lg mb-4 text-center">Add New Patient</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.first_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, first_name: e.target.value })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.last_name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, last_name: e.target.value })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              pattern="[0-9]*"
              className="input input-bordered"
              value={formData.phone_number}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone_number: e.target.value })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Date of Birth</span>
            </label>
            <input
              type="date"
              className="input input-bordered"
              value={formData.date_of_birth}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, date_of_birth: e.target.value })}
              required
            />
          </div>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered"
              value={formData.gender}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, gender: e.target.value })}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="modal-action flex justify-end gap-2 mt-12">
            <button type="button" className="btn btn-outline hover:bg-base-200/50 min-w-32 max-w-64 min-h-12 rounded-lg" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary min-w-32 max-w-64 min-h-12 rounded-lg">Add Patient</button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
