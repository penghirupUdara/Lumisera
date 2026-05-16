import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default async function PhotographerLandingPage({ params }: { params: { username: string } }) {
  // Wait for params in next 15+ if needed, but in next 14 it's synchronous. We'll use standard await.
  const { username } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      packages: true,
      portfolios: true
    }
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      {/* Hero */}
      <header className="relative h-[70vh] flex items-center justify-center bg-black text-white">
        {user.heroImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40" 
            style={{ backgroundImage: `url(${user.heroImage})` }} 
          />
        )}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {user.heroTitle || user.name}
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 font-light mb-10">
            {user.heroSubtitle}
          </p>
          <Link 
            href={`/${username}/booking`}
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-neutral-200 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Book Now
          </Link>
        </div>
      </header>

      {/* About */}
      {user.aboutText && (
        <section className="py-20 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            {user.aboutText}
          </p>
        </section>
      )}

      {/* Portfolio */}
      {user.portfolios.length > 0 && (
        <section className="py-20 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {user.portfolios.map(item => (
                <div key={item.id} className="aspect-[4/5] bg-neutral-200 rounded-2xl overflow-hidden relative group">
                  <img src={item.imageUrl} alt={item.title || "Portfolio"} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Investment</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {user.packages.map(pkg => (
            <div key={pkg.id} className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <p className="text-neutral-500 mb-6 flex-grow">{pkg.description}</p>
              <div className="text-3xl font-bold mb-8">
                Rp {pkg.price.toLocaleString("id-ID")}
              </div>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-neutral-600">{feat}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href={`/${username}/booking?package=${pkg.id}`}
                className="mt-auto block w-full py-4 text-center border-2 border-black rounded-full font-medium hover:bg-black hover:text-white transition-colors"
              >
                Select Package
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-white py-12 text-center">
        <p className="text-neutral-400">© {new Date().getFullYear()} {user.name}. Powered by Lumisera OS.</p>
      </footer>
    </div>
  );
}
