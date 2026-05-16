import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Calendar, CheckCircle2, Clock, Users } from "lucide-react";

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions);
  
  if (!session) return null;

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { package: true },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  const totalBookings = await prisma.booking.count({ where: { userId: session.user.id } });
  const pendingBookings = await prisma.booking.count({ where: { userId: session.user.id, status: "PENDING" } });

  const stats = [
    { label: "Total Bookings", value: totalBookings, icon: Calendar, color: "text-blue-500", bg: "bg-blue-100" },
    { label: "Pending", value: pendingBookings, icon: Clock, color: "text-amber-500", bg: "bg-amber-100" },
    { label: "Clients", value: totalBookings, icon: Users, color: "text-purple-500", bg: "bg-purple-100" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-neutral-500 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Bookings</h2>
          <a href="/dashboard/bookings" className="text-sm font-medium text-lumisera-600 hover:text-lumisera-800">View All</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-neutral-500 text-sm">
              <tr>
                <th className="py-4 px-6 font-medium">Client</th>
                <th className="py-4 px-6 font-medium">Date</th>
                <th className="py-4 px-6 font-medium">Event</th>
                <th className="py-4 px-6 font-medium">Package</th>
                <th className="py-4 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-500">
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <p className="font-medium">{booking.clientName}</p>
                      <p className="text-sm text-neutral-500">{booking.clientPhone}</p>
                    </td>
                    <td className="py-4 px-6 text-neutral-600">
                      {booking.date.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-neutral-600">
                      {booking.eventType}
                    </td>
                    <td className="py-4 px-6 text-neutral-600">
                      {booking.package.name}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                        ${booking.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 
                          booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
