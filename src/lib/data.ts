export const CATEGORY_DATA = {
  wisuda: {
    title: "Paket Foto Wisuda",
    subtitle: "Abadikan momen kelulusanmu dengan hasil jepretan profesional.",
    heroImage: "/img/wisuda/1.jpg",
    packages: [
      {
        id: "wisuda-personal",
        name: "Personal / Single",
        price: "Rp 349.000",
        priceNumber: 349000,
        originalPrice: "Rp 500.000",
        isPopular: false,
        features: ["1 Jam Sesi Foto", "1 Orang", "Unlimited Shoot", "50 Foto Edit Premium", "Semua File Mentah"],
      },
      {
        id: "wisuda-group",
        name: "Group Sahabat",
        price: "Rp 599.000",
        priceNumber: 599000,
        originalPrice: "Rp 800.000",
        isPopular: true,
        features: ["2 Jam Sesi Foto", "Maksimal 5 Orang", "Unlimited Shoot", "100 Foto Edit Premium", "Semua File Mentah"],
      },
      {
        id: "wisuda-studio",
        name: "Premium Studio",
        price: "Rp 999.000",
        priceNumber: 999000,
        originalPrice: "Rp 1.500.000",
        isPopular: false,
        features: ["2 Jam Sesi Studio", "Termasuk Sewa Studio", "Maksimal 5 Orang", "Cetak 1 Frame 12R", "Semua File Mentah"],
      }
    ]
  },
  wedding: {
    title: "Paket Wedding & Prewed",
    subtitle: "Tangkap setiap senyum dan air mata bahagia di hari spesial Anda.",
    heroImage: "/img/wedding/1.jpg",
    packages: [
      {
        id: "wedding-akad",
        name: "Akad Only",
        price: "Rp 1.499.000",
        priceNumber: 1499000,
        originalPrice: "Rp 2.000.000",
        isPopular: false,
        features: ["Sesi Foto Akad (Maks 4 Jam)", "1 Fotografer Senior", "100 Foto Edit", "Flashdisk Semua File Mentah"],
      },
      {
        id: "wedding-full",
        name: "Akad + Resepsi",
        price: "Rp 2.499.000",
        priceNumber: 2499000,
        originalPrice: "Rp 3.500.000",
        isPopular: true,
        features: ["Sesi Foto 1 Hari Penuh", "2 Fotografer Senior", "Cetak Album Eksklusif 4R", "Cinematic Video 1 Menit", "Flashdisk Semua File Mentah"],
      },
      {
        id: "wedding-bundling",
        name: "Prewed + Wedding",
        price: "Rp 4.999.000",
        priceNumber: 4999000,
        originalPrice: "Rp 6.500.000",
        isPopular: false,
        features: ["Sesi Prewedding (1 Hari)", "Sesi Wedding (1 Hari Penuh)", "3 Fotografer & 1 Videografer", "Cetak 2 Album + 1 Canvas 60x40", "Flashdisk Eksklusif"],
      }
    ]
  },
  event: {
    title: "Paket Dokumentasi Event",
    subtitle: "Ulang tahun, corporate gathering, atau konser—kami siap meliputnya.",
    heroImage: "/img/event/1.jpg",
    packages: [
      {
        id: "event-half",
        name: "Half-Day Event",
        price: "Rp 799.000",
        priceNumber: 799000,
        originalPrice: "Rp 1.000.000",
        isPopular: false,
        features: ["Liputan Maksimal 4 Jam", "1 Fotografer Profesional", "100 Foto Edit Pilihan", "Akses G-Drive 1 Bulan"],
      },
      {
        id: "event-full",
        name: "Full-Day Event",
        price: "Rp 1.499.000",
        priceNumber: 1499000,
        originalPrice: "Rp 2.000.000",
        isPopular: true,
        features: ["Liputan Maksimal 8 Jam", "2 Fotografer Profesional", "300 Foto Edit Pilihan", "Akses G-Drive 3 Bulan"],
      },
      {
        id: "event-corporate",
        name: "Corporate + Video",
        price: "Rp 3.499.000",
        priceNumber: 3499000,
        originalPrice: "Rp 4.500.000",
        isPopular: false,
        features: ["Liputan Maksimal 8 Jam", "2 Fotografer & 1 Videografer", "Video Highlight 3 Menit", "Reels/TikTok Video", "Flashdisk Semua File"],
      }
    ]
  }
};
