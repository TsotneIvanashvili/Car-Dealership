import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Showroom" },
  { to: "/products", label: "Inventory" },
  { to: "/about", label: "Experience" },
];

const NavBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  return (
    <nav className="sticky top-0 z-50 h-20 border-b border-white/5 bg-[#0E0F13]/80 px-8 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-full w-full max-w-360 items-center justify-between">
        <Link
          to="/"
          className="text-xl font-black uppercase tracking-[0.25em] text-[#F5F4F1] transition-opacity hover:opacity-90"
        >
          Delearship
        </Link>
        <div className="flex items-center gap-10">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative text-xs font-semibold uppercase tracking-widest transition duration-300 ${
                  isActive
                    ? "text-[#F5F4F1]"
                    : "text-[#94A3B8] hover:text-[#F5F4F1]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-0.5 w-full origin-left bg-[#CBA45A] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="relative flex h-10 items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search fleet..."
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              className={`absolute right-0 h-10 rounded-sm border border-white/10 bg-[#16181F] pr-12 text-sm text-[#F5F4F1] shadow-xl outline-none placeholder:text-[#94A3B8]/50 transition-all duration-300 ease-in-out focus:border-[#CBA45A]/50 ${
                searchOpen
                  ? "w-64 px-4 opacity-100 pointer-events-auto"
                  : "w-0 opacity-0 pointer-events-none"
              }`}
            />

            <button
              onClick={() => setSearchOpen((open) => !open)}
              className="z-20 flex h-10 w-10 items-center justify-center text-[#94A3B8] transition-colors hover:text-[#F5F4F1] cursor-pointer"
              aria-label={searchOpen ? "Close search" : "Open search"}
            >
              <i
                className={`fa-solid ${
                  searchOpen ? "fa-xmark" : "fa-magnifying-glass"
                } text-sm`}
              ></i>
            </button>
          </div>

          <Link
            to="/login"
            className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] transition duration-300 hover:text-[#F5F4F1]"
          >
            Sign In
          </Link>

          <Link
            to="/cart"
            className="flex h-10 items-center rounded-sm bg-[#F5F4F1] px-6 text-xs font-bold uppercase tracking-widest text-black shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-[#E3C57E]"
          >
            Inquire
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;