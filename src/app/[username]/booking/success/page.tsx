import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function BookingSuccessPage({ params }: { params: { username: string } }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6 text-center">
      <div className="bg-white p-12 rounded-3xl shadow-sm border border-neutral-100 max-w-md w-full">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Booking Berhasil!</h1>
        <p className="text-neutral-500 mb-8">
          Terima kasih telah melakukan booking. Fotografer akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
        </p>
        <Link 
          // @ts-ignore
          href={`/${params.username}`}
          className="block w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
        >
          Kembali ke Profil
        </Link>
      </div>
    </div>
  );
}
