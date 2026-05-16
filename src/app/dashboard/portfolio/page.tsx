import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ImagePlus, Trash2 } from "lucide-react";

export default async function PortfolioPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const portfolios = await prisma.portfolio.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  async function createPortfolio(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return;

    const title = formData.get("title") as string;
    const imageUrl = formData.get("imageUrl") as string;

    await prisma.portfolio.create({
      data: {
        userId: session.user.id,
        title,
        imageUrl
      }
    });
    revalidatePath("/dashboard/portfolio");
  }

  async function deletePortfolio(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.portfolio.delete({ where: { id } });
    revalidatePath("/dashboard/portfolio");
  }

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Portfolio Gallery */}
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Manajemen Portfolio</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolios.length === 0 ? (
            <div className="col-span-full p-8 text-center text-neutral-500 bg-white rounded-2xl border border-neutral-200">
              Belum ada foto portfolio yang diunggah.
            </div>
          ) : (
            portfolios.map(item => (
              <div key={item.id} className="relative group rounded-xl overflow-hidden aspect-[4/5] bg-neutral-200 border border-neutral-200">
                <img 
                  src={item.imageUrl} 
                  alt={item.title || "Portfolio"} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <form action={deletePortfolio}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                  {item.title && (
                    <p className="text-white font-medium text-sm truncate">{item.title}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add New Portfolio */}
      <div className="lg:w-96">
        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm sticky top-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-lumisera-600" />
            Tambah Foto
          </h2>
          
          <form action={createPortfolio} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Judul / Kategori (Opsional)</label>
              <input name="title" type="text" placeholder="Cth: Wedding of John & Doe" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">URL Gambar Valid</label>
              <input required name="imageUrl" type="url" placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
              <p className="text-xs text-neutral-500 mt-2">
                *Sementara hanya mendukung input URL eksternal (Google Drive / Unsplash / dll)
              </p>
            </div>
            
            <button type="submit" className="w-full py-3 bg-lumisera-600 hover:bg-lumisera-700 text-white rounded-xl font-medium transition-colors">
              Simpan Portfolio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
