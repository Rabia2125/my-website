import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-10">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link href="/dashboard/queries" className="hover:text-blue-400">Contact Queries</Link>
        <Link href="/" className="mt-10 text-red-400 hover:text-red-300">Logout</Link>
      </nav>
    </div>
  );
}