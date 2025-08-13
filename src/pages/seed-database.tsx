import { useEffect } from "react";

export default function SeedDatabase() {
  useEffect(() => {
    const seedDatabase = async () => {
      const response = await fetch('/api/seed-database');
      const data = await response.json();
      console.log(data);
    };

    seedDatabase();
  }, []);

  return <div></div>;
}