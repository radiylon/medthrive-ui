export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 m-4">
      <h1 className="text-2xl font-bold text-primary">Medthrive</h1>
      <h1 className="text-2xl font-bold text-primary">Caregiver Dashboard</h1>
      {children}
    </div>
  );
}