import Sidebar from "@/components/sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="relative h-full max-h-screen transition-all duration-200 ease-in-out xl:ml-64 rounded-xl">
        {children}
      </main>
    </>
  );
}
