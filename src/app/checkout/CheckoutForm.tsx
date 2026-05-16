"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Logo } from "@/components/Logo";

type PackageData = {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  features: string[];
};

export default function CheckoutForm({ categoryTitle, pkg }: { categoryTitle: string, pkg: PackageData }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    location: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `Halo Lumisera, saya ingin booking paket fotografi berikut:

📦 *Kategori*: ${categoryTitle}
🏷️ *Paket*: ${pkg.name}
💰 *Total Harga*: ${pkg.price}

*Data Pemesan:*
👤 *Nama*: ${formData.name}
📱 *No. WA*: ${formData.phone}
📅 *Tanggal Acara*: ${formData.date}
📍 *Lokasi*: ${formData.location}
📝 *Catatan*: ${formData.notes || "-"}

Mohon konfirmasi ketersediaan jadwal dan instruksi pembayaran untuk paket ini. Terima kasih!`;

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/6281281126207?text=${encodedText}`; // Admin WhatsApp number
    
    // Redirect to WhatsApp
    window.location.href = waUrl;
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2">
          <Logo variant="light" className="scale-75 origin-left text-black" />
        </Link>
        <button 
          onClick={() => window.history.back()} 
          className="text-sm font-medium text-neutral-500 hover:text-black flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Package Summary */}
        <div>
          <div className="bg-black text-white p-6 rounded-3xl sticky top-8">
            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Ringkasan Pesanan</h3>
            <h2 className="text-2xl font-bold mb-1">{categoryTitle}</h2>
            <p className="text-lumisera-400 font-medium mb-6">Paket: {pkg.name}</p>
            
            <div className="border-t border-white/10 pt-6 mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-4">Yang Anda Dapatkan:</h4>
              <ul className="space-y-3">
                {pkg.features.map((feat, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-400">
                    <span className="text-lumisera-500">•</span> {feat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 pt-6 flex items-center justify-between">
              <span className="text-gray-400">Total Pembayaran</span>
              <span className="text-2xl font-bold text-white">{pkg.price}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
            <h1 className="text-3xl font-bold mb-2">Lengkapi Data Diri</h1>
            <p className="text-neutral-500 mb-8">Isi formulir ini, lalu kami akan mengarahkan Anda ke WhatsApp untuk proses konfirmasi & pembayaran DP.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                <input 
                  required 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500 bg-neutral-50" 
                  placeholder="Contoh: Andi Pratama"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">No. WhatsApp <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500 bg-neutral-50" 
                    placeholder="Contoh: 08123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Tanggal Acara <span className="text-red-500">*</span></label>
                  <input 
                    required 
                    type="date" 
                    name="date" 
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500 bg-neutral-50 text-neutral-700" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Lokasi Acara <span className="text-red-500">*</span></label>
                <input 
                  required 
                  type="text" 
                  name="location" 
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500 bg-neutral-50" 
                  placeholder="Contoh: Gedung Balai Kartini, Jakarta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Catatan Khusus (Opsional)</label>
                <textarea 
                  name="notes" 
                  rows={3} 
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-lumisera-500 bg-neutral-50"
                  placeholder="Ceritakan detail acara atau request khusus..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 rounded-xl bg-lumisera-600 hover:bg-lumisera-700 text-white font-bold transition-colors flex items-center justify-center gap-2 mt-8 text-lg"
              >
                Lanjutkan Pembayaran ke WhatsApp <Send className="w-5 h-5" />
              </button>
              
              <p className="text-xs text-center text-neutral-400 mt-4">
                Dengan mengklik tombol di atas, Anda akan dialihkan ke WhatsApp Lumisera Studio (0812-3456-7890) secara otomatis dengan format pesanan yang sudah terisi.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
