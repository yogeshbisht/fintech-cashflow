import Sidebar from "@/components/sidebar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="relative h-full max-h-screen transition-standard xl:ml-64 rounded-xl my-4 pl-4">
        {children}
      </main>
    </>
  );
}
