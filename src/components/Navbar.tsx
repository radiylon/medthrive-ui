import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm border-b-2 border-primary">
      <div className="flex-1 flex px-8 justify-between">
        <Link href="/">
          <span className="text-2xl font-bold text-base-content">MED</span>
          <span className="text-2xl font-bold text-primary">THRIVE</span>
        </Link>
      </div>
    </div>
  );
}
