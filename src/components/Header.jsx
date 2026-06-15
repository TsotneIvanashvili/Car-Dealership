import { useState } from "react";
import { Link } from "react-router-dom";

const navBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="flex items-center justify-around h-20 bg-[#0b0f0ed9] backdrop-blur-2xl border-b border-[#1F2A27] sticky top-0 z-50">
      <div>
        <i className="fa-solid fa-car-side fa-2xl text-[#00E676] hover:pl-5 transition-all"></i>
      </div>

      <div className="flex gap-10">
        <Link className="text-[#E7F2EE] text-lg hover:text-[#00C853] transition duration-300" to="/">
          Home
        </Link>

        <Link className="text-[#E7F2EE] text-lg hover:text-[#00C853] transition duration-300" to="/products">
          Products
        </Link>

        <Link className="text-[#E7F2EE] text-lg hover:text-[#00C853] transition duration-300" to="/about">
          About
        </Link>
      </div>


      <div className="flex items-center gap-5">

      <div className={` flex items-center overflow-hidden rounded-full border border-[#22322D] bg-[#121A18]/70 backdrop-blur-md transition-all duration-500 ease-in-out ${searchOpen ? "w-72 px-3" : "w-11"} h-11`}>
          <button onClick={() => setSearchOpen(!searchOpen)} className=" min-w-11 h-11 flex items-center justify-center text-[#E7F2EE] hover:text-[#00C853] transition-colors cursor-pointer">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <input type="text" placeholder="Search cars..." className={` bg-transparent outline-none text-[#E7F2EE] placeholder:text-[#6E7C77] transition-all duration-300 ${searchOpen ? "w-full opacity-100 ml-2" : "w-0 opacity-0"}`}/>
        </div>

        <Link className="text-[#E7F2EE] text-lg hover:text-white transition duration-300" to="/login">
          Log In
        </Link>


        <Link className="text-[#E7F2EE] text-lg hover:text-white transition duration-300" to="/signup">
          Sign Up
        </Link>


        <Link to="/cart" className=" flex items-center gap-2 text-[#0B0F0E] bg-[#00C853] px-5 py-2.5 rounded-full font-medium hover:bg-[#00E676] transition-all duration-300 shadow-[0_0_20px_rgba(0,200,83,0.25)] hover:shadow-[0_0_40px_rgba(0,200,83,0.35)] ">
          <i className="fa-solid fa-cart-shopping"></i>
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default navBar;
