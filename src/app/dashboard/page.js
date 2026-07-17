import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // Database se stats nikal rahe hain
  const totalQueries = await prisma.contact.count();
  const pendingQueries = await prisma.contact.count({ where: { status: 'Pending' } });
  const resolvedQueries = await prisma.contact.count({ where: { status: 'Resolved' } });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded">
            <h2 className="font-bold">Total Queries</h2>
            <p className="text-2xl">{totalQueries}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
            <h2 className="font-bold">Pending</h2>
            <p className="text-2xl">{pendingQueries}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
            <h2 className="font-bold">Resolved</h2>
            <p className="text-2xl">{resolvedQueries}</p>
        </div>
      </div>
    </div>
  );
}