import Link from "next/link";
import { LayoutDashboard, Calendar, Package, Image as ImageIcon, Settings, LogOut } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Logo } from "@/components/Logo";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Calendar, label: "Bookings", href: "/dashboard/bookings" },
    { icon: Package, label: "Packages", href: "/dashboard/packages" },
    { icon: ImageIcon, label: "Portfolio", href: "/dashboard/portfolio" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-neutral-200">
          <Link href="/" className="flex items-center">
            <Logo className="scale-75 origin-left" />
          </Link>
          <div className="mt-2 text-sm text-lumisera-600 font-medium bg-lumisera-50 inline-block px-3 py-1 rounded-full border border-lumisera-100">
            {session.user.username}.lumisera.com
          </div>
        </div>
        
        <nav className="p-4 flex-1 space-y-1">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-600 hover:bg-lumisera-50 hover:text-lumisera-700 transition-colors font-medium"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <Link 
            href="/api/auth/signout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="h-20 bg-white border-b border-neutral-200 flex items-center justify-end px-8">
          <div className="flex items-center gap-4">
            <span className="font-medium">{session.user.name}</span>
            <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
