import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) redirect("/login");

  async function updateProfile(formData: FormData) {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return;

    const name = formData.get("name") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const heroTitle = formData.get("heroTitle") as string;
    const heroSubtitle = formData.get("heroSubtitle") as string;
    const heroImage = formData.get("heroImage") as string;
    const aboutText = formData.get("aboutText") as string;

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        whatsapp,
        heroTitle,
        heroSubtitle,
        heroImage,
        aboutText
      }
    });

    revalidatePath("/dashboard/settings");
    revalidatePath(`/${session.user.username}`);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Pengaturan Landing Page</h1>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
        <form action={updateProfile} className="space-y-8">
          
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-neutral-100 pb-2">Informasi Dasar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Brand / Nama Anda</label>
                <input defaultValue={user.name || ""} name="name" type="text" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nomor WhatsApp (Contoh: 62812...)</label>
                <input defaultValue={user.whatsapp || ""} name="whatsapp" type="text" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-neutral-100 pb-2">Tampilan Banner (Hero)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Judul Utama Banner</label>
                <input defaultValue={user.heroTitle || ""} name="heroTitle" type="text" placeholder="Abadikan Momen Terbaikmu" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sub Judul Banner</label>
                <input defaultValue={user.heroSubtitle || ""} name="heroSubtitle" type="text" className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL Gambar Banner Belakang</label>
                <input defaultValue={user.heroImage || ""} name="heroImage" type="url" placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none" />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-neutral-100 pb-2">Tentang Saya</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
              <textarea defaultValue={user.aboutText || ""} name="aboutText" rows={5} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-lumisera-500 outline-none resize-none"></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="px-8 py-3 bg-lumisera-600 hover:bg-lumisera-700 text-white rounded-xl font-medium transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
