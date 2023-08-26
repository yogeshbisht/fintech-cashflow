import AuthFooter from "@/components/auth-footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className="pb-56 pt-12 m-4 min-h-50-screen items-start rounded-xl p-0 relative overflow-hidden flex bg-cover bg-center bg-[url('../assets/img/curved-images/curved9.jpg')]">
        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover opacity-60 bg-gradient-to-tl from-gray-900 to-slate-800"></span>
        <div className="relative z-1 w-full">
          <div className="flex items-center justify-center">
            <div className="px-3 max-w-xl mx-auto text-center">
              <h1 className="mt-12 mb-2 text-white text-4xl">Welcome!</h1>
              <p className="text-white ">
                This is a demo application which is built using Next.js and Tailwind CSS. It uses
                Clerk for authentication and authorization.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center -mt-24">{children}</div>
      <AuthFooter />
    </main>
  );
}