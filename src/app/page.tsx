"use client";

import { motion } from "framer-motion";
import { Camera, CalendarCheck, Clock, ArrowRight, CheckCircle2, ImageOff, Frown, Hourglass, CircleDollarSign, Star } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useState } from "react";

const GALLERY_DATA = [
  { id: 1, type: "Wedding", url: "src/img/wedding/1.jpg" },
  { id: 2, type: "Wedding", url: "src/img/wedding/2.jpg" },
  { id: 3, type: "Wedding", url: "src/img/wedding/3.jpg" },
  { id: 4, type: "Wisuda", url: "src/img/wisuda/1.jpg" },
  { id: 5, type: "Wisuda", url: "src/img/wisuda/2.jpg" },
  { id: 6, type: "Wisuda", url: "src/img/wisuda/3.jpg" },
  { id: 7, type: "Event", url: "src/img/event/1.jpg" },
  { id: 8, type: "Event", url: "src/img/event/2.jpg" },
  { id: 9, type: "Event", url: "src/img/event/3.jpg" },
  { id: 10, type: "Keluarga", url: "src/img/keluarga/1.jpg" },
  { id: 11, type: "Keluarga", url: "src/img/keluarga/2.jpg" },
  { id: 12, type: "Keluarga", url: "src/img/keluarga/3.jpg" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lumisera-500/30 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Logo variant="dark" className="scale-[0.6] sm:scale-75 origin-left" />
          </Link>
          <div className="flex items-center gap-6">
            <Link href="#gallery" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
              Portofolio
            </Link>
            <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">
              Keunggulan Kami
            </Link>
            <Link
              href="#pricing"
              className="bg-white text-black px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              Booking Sekarang
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
              Momen Berlalu, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lumisera-300 to-lumisera-500">
                Kenangan Abadi.
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Lumisera hadir untuk menangkap setiap detik berharga dalam hidup Anda—dengan sentuhan profesional, elegan, dan hasil yang memukau.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#pricing"
                className="w-full sm:w-auto bg-lumisera-600 hover:bg-lumisera-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center justify-center gap-2 group"
              >
                Pesan Jadwal Foto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#gallery"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-full text-lg font-medium transition-all"
              >
                Lihat Portofolio
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Pain Point Section (Client perspective) */}
        <div className="max-w-7xl mx-auto mt-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Sering Kecewa dengan Jasa Fotografer?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Momen spesial tidak bisa diulang. Jangan sampai rusak karena salah memilih fotografer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Clock className="w-8 h-8 text-red-400" />,
                title: "Fotografer Telat",
                desc: "Datang terlambat dan membuat momen penting Anda terlewat begitu saja."
              },
              {
                icon: <Frown className="w-8 h-8 text-red-400" />,
                title: "Gaya Kaku",
                desc: "Tidak pandai mengarahkan gaya sehingga hasil foto terlihat canggung."
              },
              {
                icon: <Hourglass className="w-8 h-8 text-red-400" />,
                title: "File Lama Dikirim",
                desc: "Harus menunggu berminggu-minggu atau berbulan-bulan untuk melihat hasilnya."
              },
              {
                icon: <CircleDollarSign className="w-8 h-8 text-red-400" />,
                title: "Harga Tidak Transparan",
                desc: "Tiba-tiba ada biaya tambahan di luar kesepakatan awal."
              }
            ].map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-red-500/5 border border-red-500/10 p-8 rounded-3xl hover:bg-red-500/10 transition-colors flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{problem.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {problem.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block px-6 py-3 bg-lumisera-500/10 border border-lumisera-500/20 rounded-full text-lumisera-400 font-medium">
              ✨ Di Lumisera, kami pastikan hal-hal di atas tidak akan terjadi.
            </div>
          </div>
        </div>

        {/* Gallery Showcase Section */}
        <div id="gallery" className="max-w-7xl mx-auto mt-40 pt-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Portofolio Kami</h2>
            <p className="text-gray-400 text-lg">Jelajahi hasil jepretan terbaik dari berbagai momen sakral & bahagia.</p>
          </div>

          <GalleryDisplay />
        </div>

        {/* Features / Why Us */}
        <div id="features" className="max-w-7xl mx-auto mt-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Kenapa Memilih Lumisera?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="w-6 h-6 text-lumisera-400" />,
                title: "Peralatan Profesional",
                desc: "Kami menggunakan kamera dan lensa spesifikasi tinggi untuk hasil gambar yang tajam dan sinematik."
              },
              {
                icon: <CalendarCheck className="w-6 h-6 text-lumisera-300" />,
                title: "Pemesanan Mudah",
                desc: "Booking jadwal secara online dengan transparan tanpa perlu bolak-balik chat."
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-lumisera-500" />,
                title: "Selesai Tepat Waktu",
                desc: "Garansi pengiriman foto maksimal H+3 (atau 24 jam untuk paket prioritas)."
              }
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto mt-40">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Apa Kata Klien Kami?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Lebih dari 500+ klien telah mempercayakan momen berharga mereka kepada Lumisera.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah & Dimas",
                event: "Wedding",
                review: "Lumisera luar biasa! Fotografernya asik, ngarahin gayanya natural banget. Hasil fotonya bikin nangis haru karena bagus banget.",
                rating: 5
              },
              {
                name: "Andi Pratama",
                event: "Wisuda",
                review: "Sangat profesional. Walaupun acaranya padat, fotografernya sabar banget dan hasilnya dikirim cuma H+1. Mantap!",
                rating: 5
              },
              {
                name: "Keluarga Bpk. Wijaya",
                event: "Family Gathering",
                review: "Tone warnanya elegan dan mahal. Gak nyesel pakai jasa Lumisera, harganya juga sangat transparan dari awal.",
                rating: 5
              }
            ].map((testi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testi.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-8 flex-1 italic">
                  "{testi.review}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-lumisera-600/20 flex items-center justify-center text-lumisera-400 font-bold text-lg">
                    {testi.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testi.name}</h4>
                    <p className="text-xs text-lumisera-400">{testi.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div id="pricing" className="max-w-6xl mx-auto mt-40 pt-10 text-center px-4">
          <div className="inline-block px-4 py-1.5 bg-lumisera-500/10 text-lumisera-400 rounded-full text-sm font-bold mb-4 border border-lumisera-500/20">
            🔥 PROMO TERBATAS BULAN INI
          </div>
          <h2 className="text-4xl font-bold mb-4">Pilih Paket Sesuai Kebutuhan</h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto">Harga transparan, tanpa biaya tersembunyi. Dapatkan hasil foto premium dengan harga investasi yang masuk akal.</p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Wisuda */}
            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/50 to-black hover:border-lumisera-500/30 transition-all flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-bl-xl border-l border-b border-red-500/20">
                Sisa 4 Slot
              </div>
              <h3 className="text-2xl font-bold mb-2">Wisuda</h3>
              <p className="text-gray-400 mb-6 text-sm">Abadikan momen kelulusanmu dengan sempurna</p>
              <div className="mb-8">
                <span className="text-gray-500 line-through text-lg block mb-1">Rp 500.000</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-lumisera-400">Rp</span>
                  <span className="text-5xl font-extrabold tracking-tight">349<span className="text-2xl">rb</span></span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["1 Jam Sesi Foto Eksklusif", "Unlimited Shoot", "50 Foto Edit Premium", "Semua File Mentah (Drive)"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lumisera-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book/wisuda" className="block w-full py-3.5 rounded-full border border-lumisera-500/50 text-lumisera-400 text-center hover:bg-lumisera-500 hover:text-white transition-all font-bold mt-auto">
                Amankan Promo
              </Link>
            </div>

            {/* Wedding */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-lumisera-900/60 to-black border border-lumisera-500 relative flex flex-col scale-105 z-10 shadow-[0_0_40px_rgba(42,126,92,0.15)]">
              <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-gradient-to-r from-lumisera-400 to-lumisera-600 text-white px-6 py-1.5 rounded-full text-sm font-bold whitespace-nowrap shadow-lg">
                🌟 PALING LARIS
              </div>
              <div className="absolute top-4 right-4 bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/20">
                Bonus Prewed!
              </div>
              
              <h3 className="text-2xl font-bold mb-2 mt-4">Wedding / Prewed</h3>
              <p className="text-gray-400 mb-6 text-sm">Paket lengkap hari bahagia tanpa pusing</p>
              <div className="mb-8">
                <span className="text-gray-500 line-through text-lg block mb-1">Rp 3.500.000</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-lumisera-400">Rp</span>
                  <span className="text-5xl font-extrabold tracking-tight">2,49<span className="text-2xl">jt</span></span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["1 Hari Penuh Sesi Foto (Akad & Resepsi)", "2 Fotografer Senior", "1 Cetak Album Eksklusif 4R", "Flashdisk Custom Semua File", "Cinematic Video 1 Menit (Reels/TikTok)"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lumisera-400 shrink-0 mt-0.5" />
                    <span className="text-white text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book/wedding" className="block w-full py-4 rounded-full bg-lumisera-500 hover:bg-lumisera-600 text-white shadow-[0_0_20px_rgba(42,126,92,0.4)] text-center transition-all font-bold mt-auto text-lg hover:scale-105 active:scale-95">
                Pesan Sekarang
              </Link>
            </div>
            
            {/* Event */}
            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900/50 to-black hover:border-lumisera-500/30 transition-all flex flex-col relative overflow-hidden group">
              <h3 className="text-2xl font-bold mb-2">Dokumentasi Event</h3>
              <p className="text-gray-400 mb-6 text-sm">Ulang tahun, corporate gathering, dll</p>
              <div className="mb-8">
                <span className="text-gray-500 line-through text-lg block mb-1">Rp 1.000.000</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-lumisera-400">Rp</span>
                  <span className="text-5xl font-extrabold tracking-tight">799<span className="text-2xl">rb</span></span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {["Maksimal 4 Jam Liputan", "1 Fotografer Profesional", "100 Foto Edit Pilihan", "Semua File Mentah (Drive)"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-lumisera-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book/event" className="block w-full py-3.5 rounded-full border border-lumisera-500/50 text-lumisera-400 text-center hover:bg-lumisera-500 hover:text-white transition-all font-bold mt-auto">
                Amankan Promo
              </Link>
            </div>

          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-12 mt-20 text-center text-gray-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <Logo variant="dark" className="scale-75 mb-4" />
          <p>© 2026 Lumisera Studio. Menangkap cahaya, mengabadikan momen.</p>
        </div>
      </footer>
    </div>
  );
}

function GalleryDisplay() {
  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = ["Semua", "Wedding", "Wisuda", "Event", "Keluarga"];

  const filteredPhotos = activeTab === "Semua"
    ? GALLERY_DATA
    : GALLERY_DATA.filter(photo => photo.type === activeTab);

  return (
    <div className="flex flex-col items-center">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 px-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border
              ${activeTab === tab
                ? "bg-lumisera-600 text-white border-lumisera-600 shadow-[0_0_15px_rgba(42,126,92,0.3)]"
                : "bg-transparent text-gray-400 border-white/10 hover:border-lumisera-500/50 hover:text-white"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid: 3 columns, scrollable container if too many rows */}
      <div className="w-full max-w-6xl px-4">
        <div className="max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={photo.id}
                className="aspect-[4/5] overflow-hidden rounded-2xl relative group bg-neutral-900"
              >
                <img
                  src={photo.url}
                  alt={photo.type}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium px-3 py-1 bg-lumisera-600/80 backdrop-blur-sm rounded-full text-xs">
                    {photo.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
