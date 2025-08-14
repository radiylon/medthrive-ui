import Navbar from "@/components/Navbar";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-base-200 min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
