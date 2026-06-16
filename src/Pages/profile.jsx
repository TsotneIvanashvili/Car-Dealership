import { Link, useNavigate } from "react-router-dom";
import { getLocal } from "../utils/localstorage";

const Profile = () => {
  const navigate = useNavigate();

  const currentUser = getLocal("CurrentUser") || {
    name: "Guest User",
    email: "guest@gmail.com",
  };

  const savedCars = [];



  const logOut = () => {
    localStorage.removeItem("CurrentUser");
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-[#050914] text-white pt-28 px-5 md:px-12 lg:px-20">
      <div className="mx-auto pb-20">
        <div className="grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-8">
          <div className="relative overflow-hidden rounded-4xl bg-[#101622]   p-7 md:p-10">
            <div className="relative z-10 flex flex-col gap-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex items-center gap-5">   
                    <img
                      src={currentUser.image}
                      alt={currentUser.name}
                      className="h-24 w-24 rounded-2xl object-cover  "
                    />


                  <div>
                    <p className="text-[#8EA3C3] text-sm mb-2">
                      Welcome back
                    </p>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                      {currentUser.name}
                    </h1>

                    <p className="mt-3 text-[#8EA3C3]">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="h-11 px-6 rounded-full bg-white text-black text-sm font-bold hover:bg-transparent hover:text-white  -white transition cursor-pointer">
                    Edit profile
                  </button>

                  <button
                    onClick={logOut}
                    className="h-11 px-6 rounded-full  border border-[red] text-[red] text-sm font-bold hover:bg-red-500 hover:text-white transition cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-black/25   p-5">
                  <p className="text-[#8EA3C3] text-sm">Saved cars</p>
                  <h2 className="mt-3 text-4xl font-black">
                    {savedCars.length}
                  </h2>
                </div>

                <div className="rounded-2xl bg-black/25   p-5">
                  <p className="text-[#8EA3C3] text-sm">Test drives</p>
                  <h2 className="mt-3 text-4xl font-black">3</h2>
                </div>

                <div className="rounded-2xl bg-black/25   p-5">
                  <p className="text-[#8EA3C3] text-sm">Member since</p>
                  <h2 className="mt-3 text-4xl font-black">2026</h2>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-4xl bg-white/4   p-7 md:p-8">
            <p className="text-[#8EA3C3] text-sm mb-6">Account details</p>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#8EA3C3]">Full name</p>
                <p className="mt-1 font-semibold">{currentUser.name}</p>
              </div>

              <div>
                <p className="text-xs text-[#8EA3C3]">Email</p>
                <p className="mt-1 font-semibold break-all">
                  {currentUser.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8EA3C3]">Location</p>
                <p className="mt-1 font-semibold">Tbilisi, Georgia</p>
              </div>

                  
            </div>
          </aside>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 mt-8">
          <main className="rounded-4xl bg-white/4 b p-7 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
              <div>
                <p className="text-[#8EA3C3] text-sm">Your garage</p>
                <h2 className="mt-2 text-3xl md:text-4xl font-black">
                  Saved vehicles
                </h2>
              </div>

              <Link
                to="/cars"
                className="w-fit h-11 px-6 rounded-full flex items-center justify-center bg-white text-black text-sm font-bold  -white hover:bg-transparent hover:text-white transition"
              >
                Browse cars
              </Link>
            </div>

            {savedCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {savedCars.map((car) => (
                  <div
                    key={car.id}
                    className="group rounded-3xl overflow-hidden bg-[#0B101A]   hover:-white/30 transition"
                  >
                    <div className="h-48 overflow-hidden bg-black">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold">{car.name}</h3>
                      <p className="mt-2 text-[#8EA3C3]">{car.price}</p>

                      <button className="mt-5 w-full h-11 rounded-full   text-sm font-bold hover:bg-white hover:text-black transition cursor-pointer">
                        View details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="min-h-82.5 rounded-[1.75rem]  -dashed -white/15 bg-black/20 flex flex-col items-center justify-center text-center px-6">
                <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                  <i className="fa-solid fa-car-side text-2xl text-[#8EA3C3]"></i>
                </div>

                <h3 className="text-2xl font-black">No cars saved yet</h3>

                <p className="mt-3 max-w-md text-[#8EA3C3] leading-relaxed">
                  Start building your garage by saving cars you like. They will
                  appear here for quick comparison later.
                </p>

                <Link
                  to="/cars"
                  className="mt-7 h-12 px-7 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center  -white hover:bg-transparent hover:text-white transition"
                >
                  Find your first car
                </Link>
              </div>
            )}
          </main>

          <aside className="flex flex-col gap-8">
            <div className="rounded-4xl bg-white/4   p-7">
              <p className="text-[#8EA3C3] text-sm mb-5">Quick actions</p>

              <div className="flex flex-col gap-3">
                <Link
                  to="/cars"
                  className="h-12 rounded-full bg-white text-black text-sm font-bold flex justify-center items-center  border-white hover:bg-transparent hover:text-white transition"
                >
                  Explore cars
                </Link>

                <Link
                  to="/cart"
                  className="h-12 rounded-full border  text-sm font-bold flex justify-center items-center hover:bg-white hover:text-black transition"
                >
                  View cart
                </Link>

                <Link
                  to="/about"
                  className="h-12 rounded-full border  text-sm font-bold flex justify-center items-center hover:bg-white hover:text-black transition"
                >
                  Contact dealership
                </Link>
              </div>
            </div>

            <div className="rounded-4xl bg-[#0B101A] border  p-7">
              <p className="text-[#8EA3C3] text-sm">Last activity</p>

              <div className="mt-5 space-y-5">
                <div className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#00E676]" />
                  <div>
                    <p className="font-semibold">Profile opened</p>
                    <p className="text-sm text-[#8EA3C3] mt-1">Just now</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white/30" />
                  <div>
                    <p className="font-semibold">Cart checked</p>
                    <p className="text-sm text-[#8EA3C3] mt-1">
                      Earlier today
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-white/30" />
                  <div>
                    <p className="font-semibold">Viewed sports cars</p>
                    <p className="text-sm text-[#8EA3C3] mt-1">This week</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Profile;