 import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { resolveQuery } from '@/app/actions';

export default async function QueriesPage() {
  // Database se queries fetch karein
  const queries = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Queries</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((q) => (
              <tr key={q.id} className="border-t">
                <td className="p-4">{q.name}</td>
                <td className="p-4">{q.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-sm ${q.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {q.status}
                  </span>
                </td>
                <td className="p-4">
                  {q.status === 'Pending' ? (
                    <form action={async () => {
                      'use server'
                      await resolveQuery(q.id);
                      // Yeh line dashboard ke counts ko refresh kar degi
                      revalidatePath('/dashboard');
                      revalidatePath('/dashboard/queries');
                    }}>
                      <button type="submit" className="text-blue-600 hover:underline font-medium">
                        Resolve
                      </button>
                    </form>
                  ) : (
                    <span className="text-gray-400">Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}