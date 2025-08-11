import usePatients from "@/hooks/usePatients";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  const { useGetPatients } = usePatients();
  const { data: patients } = useGetPatients();

  return (
    <div className="flex flex-col gap-4 m-4">
      <h1 className="text-2xl font-bold">Patients</h1>
      {patients?.map((patient: any) => (
        <Card
          key={patient.id}
          className="w-1/4"
          onClick={() => router.push(`/patients/${patient.id}`)}
        >
          <CardHeader>
            <CardTitle>{patient.first_name} {patient.last_name}</CardTitle>
            <CardDescription>{patient.email}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
