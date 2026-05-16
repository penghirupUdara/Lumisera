import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { CATEGORY_DATA } from "@/lib/data";

export default async function BookCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryKey = resolvedParams.category.toLowerCase() as keyof typeof CATEGORY_DATA;
  const data = CATEGORY_DATA[categoryKey];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lumisera-500/30">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo variant="dark" className="scale-[0.6] sm:scale-75 origin-left" />
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{data.subtitle}</p>
          </div>

          {/* Sub-Packages */}
          <div className="grid md:grid-cols-3 gap-8 text-left mb-20">
            {data.packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`p-8 rounded-3xl flex flex-col relative transition-all duration-300 ${
                  pkg.isPopular 
                    ? "bg-gradient-to-b from-lumisera-900/60 to-black border border-lumisera-500 scale-105 shadow-[0_0_40px_rgba(42,126,92,0.15)] z-10" 
                    : "border border-white/10 bg-gradient-to-b from-neutral-900/50 to-black hover:border-lumisera-500/30"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-lumisera-400 to-lumisera-600 text-white px-6 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
                    🌟 PALING LARIS
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 mt-2">{pkg.name}</h3>
                
                <div className="mb-8 mt-4">
                  <span className="text-gray-500 line-through text-sm block mb-1">{pkg.originalPrice}</span>
                  <div className="text-4xl font-extrabold text-lumisera-400">{pkg.price}</div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${pkg.isPopular ? "text-lumisera-400" : "text-lumisera-500"}`} />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/checkout?category=${categoryKey}&packageId=${pkg.id}`}
                  className={`block w-full py-3.5 rounded-full text-center transition-all font-bold mt-auto ${
                    pkg.isPopular
                      ? "bg-lumisera-500 hover:bg-lumisera-600 text-white shadow-[0_0_20px_rgba(42,126,92,0.4)] hover:scale-105"
                      : "border border-lumisera-500/50 text-lumisera-400 hover:bg-lumisera-500 hover:text-white"
                  }`}
                >
                  Pilih Paket
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Butuh Paket Custom?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Tidak menemukan paket yang sesuai dengan kebutuhan Anda? Jangan khawatir, kami bisa menyesuaikan paket sesuai budget dan konsep acara Anda.
            </p>
            <Link 
              href="https://wa.me/6281281126207?text=Halo%20Lumisera,%20saya%20mau%20konsultasi%20paket%20custom"
              target="_blank"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-bold hover:bg-gray-200 transition-colors"
            >
              Konsultasi Gratis <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
