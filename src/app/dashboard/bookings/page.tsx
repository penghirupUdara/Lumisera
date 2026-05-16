import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { package: true },
    orderBy: { date: "asc" }
  });

  async function updateStatus(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const status = formData.get("status") as "PENDING" | "CONFIRMED" | "COMPLETED";

    await prisma.booking.update({
      where: { id },
      data: { status }
    });

    revalidatePath("/dashboard/bookings");
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Manajemen Booking</h1>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 text-neutral-500 text-sm">
              <tr>
                <th className="py-4 px-6 font-medium">Klien</th>
                <th className="py-4 px-6 font-medium">Tanggal</th>
                <th className="py-4 px-6 font-medium">Event & Paket</th>
                <th className="py-4 px-6 font-medium">Catatan</th>
                <th className="py-4 px-6 font-medium text-center">Status & Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-neutral-500">
                    Belum ada booking.
                  </td>
                </tr>
              ) : (
                bookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <p className="font-medium">{booking.clientName}</p>
                      <p className="text-sm text-neutral-500">{booking.clientPhone}</p>
                      <p className="text-sm text-neutral-500">{booking.clientEmail}</p>
                    </td>
                    <td className="py-4 px-6 text-neutral-600 whitespace-nowrap">
                      {booking.date.toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-block bg-lumisera-100 text-lumisera-800 px-2 py-1 rounded text-xs font-semibold mb-1">
                        {booking.eventType}
                      </span>
                      <p className="text-sm text-neutral-600">{booking.package.name}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-600 max-w-xs truncate">
                      {booking.notes || "-"}
                    </td>
                    <td className="py-4 px-6">
                      <form action={updateStatus} className="flex flex-col items-center gap-2">
                        <input type="hidden" name="id" value={booking.id} />
                        <select 
                          name="status" 
                          defaultValue={booking.status}
                          onChange={(e) => e.target.form?.requestSubmit()}
                          className={`text-sm px-3 py-1.5 rounded-full font-medium cursor-pointer border-0 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-lumisera-600
                            ${booking.status === 'PENDING' ? 'bg-amber-50 text-amber-700 ring-amber-600/20' : 
                              booking.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-700 ring-blue-600/20' : 
                              'bg-green-50 text-green-700 ring-green-600/20'}`}
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirmed</option>
                          <option value="COMPLETED">Completed</option>
                        </select>
                      </form>
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
