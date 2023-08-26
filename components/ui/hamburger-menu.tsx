const HamburgerMenu = () => {
  return (
    <div className="hidden p-0 text-sm transition-all ease-nav-brand text-slate-500 xl:block">
      <div className="w-4.5 overflow-hidden">
        <i className="ease-soft mb-0.75 relative block h-0.5 translate-x-[5px] rounded-sm bg-slate-500 transition-all dark:bg-white"></i>
        <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all dark:bg-white"></i>
        <i className="ease-soft relative block h-0.5 translate-x-[5px] rounded-sm bg-slate-500 transition-all dark:bg-white"></i>
      </div>
    </div>
  );
};

export default HamburgerMenu;
