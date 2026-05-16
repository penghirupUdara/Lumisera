import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function BookingPage({ 
  params, 
  searchParams 
}: { 
  params: { username: string },
  searchParams: { package?: string }
}) {
  const { username } = await params;
  const { package: selectedPackageId } = await searchParams;

  const user = await prisma.user.findUnique({
    where: { username },
    include: { packages: true }
  });

  if (!user) notFound();

  return (
    <div className="min-h-screen bg-neutral-50 py-20 px-6">
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100">
        <h1 className="text-3xl font-bold mb-2">Book a Session</h1>
        <p className="text-neutral-500 mb-8">with {user.name}</p>

        <form className="space-y-6" action="/api/bookings" method="POST">
          <input type="hidden" name="photographerId" value={user.id} />
          
          <div>
            <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
            <input required type="text" name="clientName" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" name="clientEmail" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">No. WhatsApp</label>
              <input required type="tel" name="clientPhone" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tanggal</label>
              <input required type="date" name="date" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Jenis Event</label>
              <select required name="eventType" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black">
                <option value="WISUDA">Wisuda</option>
                <option value="WEDDING">Wedding</option>
                <option value="EVENT">Event</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pilih Paket</label>
            <select required name="packageId" defaultValue={selectedPackageId || ""} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black">
              <option value="" disabled>-- Pilih Paket --</option>
              {user.packages.map((pkg: any) => (
                <option key={pkg.id} value={pkg.id}>{pkg.name} - Rp {pkg.price.toLocaleString("id-ID")}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Catatan (Opsional)</label>
            <textarea name="notes" rows={3} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black"></textarea>
          </div>

          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
