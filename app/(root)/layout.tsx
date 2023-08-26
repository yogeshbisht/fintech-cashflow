import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-soft-in-out py-4 px-6 xl:ml-68 rounded-xl">
        <Navbar />
        <div className="py-6 h-full rounded-2xl">{children}</div>
      </main>
    </>
  );
}
