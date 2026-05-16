import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Plus, Trash2 } from "lucide-react";

export default async function PackagesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const packages = await prisma.package.findMany({
    where: { userId: session.user.id },
    orderBy: { price: "asc" }
  });

  async function createPackage(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return;

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const featuresStr = formData.get("features") as string;
    
    // Convert multiline string to array
    const features = featuresStr.split("\n").map(f => f.trim()).filter(Boolean);

    await prisma.package.create({
      data: {
        userId: session.user.id,
        name,
        description,
        price,
        features
      }
    });
    revalidatePath("/dashboard/packages");
  }

  async function deletePackage(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.package.delete({ where: { id } });
    revalidatePath("/dashboard/packages");
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* List Packages */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Manajemen Paket</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packages.length === 0 ? (
            <div className="col-span-full p-8 text-center text-neutral-500 bg-white rounded-2xl border border-neutral-200">
              Belum ada paket yang dibuat.
            </div>
          ) : (
            packages.map(pkg => (
              <div key={pkg.id} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col relative group">
                <form action={deletePackage} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="hidden" name="id" value={pkg.id} />
                  <button type="submit" className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </form>

                <h3 className="text-xl font-bold mb-1 pr-10">{pkg.name}</h3>
                <p className="text-sm text-neutral-500 mb-4">{pkg.description}</p>
                <div className="text-2xl font-bold text-lumisera-700 mb-6">
                  Rp {pkg.price.toLocaleString("id-ID")}
                </div>
                
                <ul className="space-y-2 mt-auto">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                      <span className="text-lumisera-500 font-bold mt-0.5">•</span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add New Package */}
      <div className="lg:w-96">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm sticky top-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus className="w-5 h-5 text-lumisera-600" />
            Tambah Paket Baru
          </h2>
          
          <form action={createPackage} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama Paket</label>
              <input required name="name" type="text" placeholder="Cth: Prewedding Gold" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Harga (Rp)</label>
              <input required name="price" type="number" min="0" placeholder="1500000" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
              <input name="description" type="text" placeholder="Paket lengkap untuk seharian..." className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Daftar Fitur (Satu per baris)</label>
              <textarea required name="features" rows={5} placeholder="Sesi 4 Jam&#10;Cetak Album 4R&#10;Semua file mentah" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none resize-none"></textarea>
            </div>
            
            <button type="submit" className="w-full py-3 bg-lumisera-600 hover:bg-lumisera-700 text-white rounded-xl font-medium transition-colors">
              Simpan Paket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
