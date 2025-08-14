import { useToast } from "@/contexts/ToastContext";

export default function Toast() {
  const { toast } = useToast();

  if (!toast.isVisible) return null;

  const alertClass = () => {
    if (toast.type === 'success') {
      return 'alert alert-success bg-success/50';
    } else if (toast.type === 'error') {
      return 'alert alert-error bg-error/50';
    } else if (toast.type === 'warning') {
      return 'alert alert-warning bg-warning/50';
    } else {
      return 'alert alert-info bg-info/50';
    }
  }
  
  return (
    <div className="toast toast-bottom z-50 h-12 mb-6 mr-6 rounded-sm">
      <div className={alertClass()}>
        <span className="font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
