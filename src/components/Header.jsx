import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getLocal } from "../utils/localstorage";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Cars" },
  { to: "/about", label: "About Us" },
  {to: "/cart", label: "Cart"}
];

const NavBar = () => {
  const loaction = useLocation()
  let [user, setUser] = useState(null)


  

  useEffect( () => {
    if(location.pathname === "/"){
      setUser(getLocal("CurrentUser"))
    }
  

  }, [location.pathname])

  console.log(user);
  

  return (
    <nav className="sticky top-0 z-50 h-20 border-b  bg-[#010619b2] px-8 backdrop-blur-md transition-colors duration-300">
      <div className=" flex h-full w-full items-center justify-around">
        <Link
          to="/"
          className="text-2xl font-black uppercase tracking-[0.25em] text-[#F5F4F1] transition-opacity hover:opacity-90"
        >
          Dealership
        </Link>
        <div className="flex items-center gap-10">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative text-m font-semibold uppercase tracking-widest transition duration-300 ${
                  isActive
                    ? "text-[#F5F4F1]"
                    : "text-[#94A3B8] hover:text-[#F5F4F1]"
                }`
              }
            >
              
                <>
                  {label}
                  
                </>
              
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link
            to={`${
              user ? `/profile` : "/signup" 
            }`}
            className={
              user ? ` `: "text-xs font-semibold uppercase tracking-widest text-[#94A3B8] transition duration-300 hover:text-[#F5F4F1]"
            }
          >
            {
              user ? <img src={user.image} className="w-15 rounded-[2000px]" alt="" />: "Sign Up"
            }

          </Link>


          

          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;