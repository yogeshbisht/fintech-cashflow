import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="relative flex-1 py-4 px-6 xl:ml-68 rounded-xl">
        <Navbar />
        <div className="py-6 h-full rounded-2xl">{children}</div>
      </main>
    </div>
  );
}
