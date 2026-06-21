import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#050914] text-white ">
      <div className="max-w-full mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link
              to="/"
              className="text-2xl font-black tracking-[0.35em] uppercase"
            >
              Dealership
            </Link>

            <p className="mt-6 text-[#94A3B8] text-sm leading-7 max-w-sm">
              Premium vehicles built for power, prestige, and perfection.
              Explore luxury cars with bold design and serious performance.
            </p>

            <div className="flex gap-4 mt-7">
              <a
                href="https://www.facebook.com/tsotne.ivanashvili.2025"
                className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-full text-[#94A3B8] hover:text-white hover:border-white transition"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/tsottneee_/"
                className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-full text-[#94A3B8] hover:text-white hover:border-white transition"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/tsotne-ivanashvili-192b09351/"
                className="w-10 h-10 border border-white/20 flex items-center justify-center rounded-full text-[#94A3B8] hover:text-white hover:border-white transition"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white">
              Navigation
            </h3>

            <ul className="mt-6 flex flex-col gap-4 text-sm uppercase tracking-[0.18em]">
              <li>
                <Link to="/" className="text-[#94A3B8] hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cars"
                  className="text-[#94A3B8] hover:text-white transition"
                >
                  Cars
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[#94A3B8] hover:text-white transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white">
              Showroom
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-sm text-[#94A3B8] leading-6">
              <p>Tbilisi, Georgia</p>
              <p>Mon - Sat: 10:00 - 20:00</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-white">
              Stay Updated
            </h3>

            <p className="mt-6 text-sm text-[#94A3B8] leading-7">
              Get updates about new arrivals, special offers, and exclusive
              vehicles.
            </p>

            
          </div>
        </div>

       
      </div>
    </footer>
  );
};

export default Footer;