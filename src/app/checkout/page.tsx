import { CATEGORY_DATA } from "@/lib/data";
import { notFound } from "next/navigation";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ category?: string, packageId?: string }> }) {
  const resolvedParams = await searchParams;
  const { category, packageId } = resolvedParams;
  
  if (!category || !packageId) {
    return notFound();
  }

  const categoryData = CATEGORY_DATA[category as keyof typeof CATEGORY_DATA];
  if (!categoryData) return notFound();

  const pkg = categoryData.packages.find(p => p.id === packageId);
  if (!pkg) return notFound();

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-lumisera-500/30">
      <CheckoutForm categoryTitle={categoryData.title} pkg={pkg} />
    </div>
  );
}
