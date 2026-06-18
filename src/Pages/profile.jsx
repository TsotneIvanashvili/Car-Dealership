import { useState } from "react";
import { Link } from "react-router-dom";
import { getLocal } from "../utils/localstorage.js";


const Profile = () => {
  const currentUser = getLocal("CurrentUser") || {
    name: "Guest User",
    email: "guest@gmail.com",
    location: "Tbilisi, Georgia",
  };

  const savedCars = getLocal("Favorites") || [];
  const orders = getLocal("Orders") || [];

  const [activeTab, setActiveTab] = useState("saved");

  const memberYear = currentUser.memberSince || new Date().getFullYear();
  const tabClass = (tab) =>
    `pb-5 text-sm font-black uppercase tracking-wider transition ${
      activeTab === tab
        ? "border-b-2 border-[#3E66FF] text-white"
        : "text-[#8EA6C9] hover:text-white"
    }`;

  return (
    <main className="min-h-screen bg-[#07090e] px-6 py-28 text-white md:px-16 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-5">
          <span className="h-px w-12 bg-[#3E66FF]"></span>

          <p className="text-sm font-black uppercase tracking-[0.35em] text-[#3E66FF]">
            Account
          </p>
        </div>

        <section className="relative overflow-hidden border border-[#203049] bg-[#0B111D] p-8 shadow-2xl shadow-black/40 md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(62,102,255,0.22),transparent_38%)]"></div>

          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-8 md:flex-row md:items-center">
              <div className="flex overflow-hidden h-36 w-36 shrink-0 items-center justify-center rounded-full border border-[#3E66FF] bg-[#10192A] text-4xl font-black text-[#F5F4EA]">
                <img  src={currentUser.image} alt="" />
              </div>

              <div>
                <h1 className="text-5xl font-black uppercase leading-none tracking-tight text-[#F5F4EA] md:text-7xl">
                  {currentUser.name}
                </h1>

                <p className="mt-5 text-lg font-medium text-[#9BB7E5]">
                  {currentUser.email} · {currentUser.location || "Tbilisi, Georgia"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-black text-[#F5F4EA]">
                  {savedCars.length}
                </h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6F86AA]">
                  Saved
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#F5F4EA]">
                  {orders.length}
                </h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6F86AA]">
                  Orders
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#F5F4EA]">
                  {memberYear}
                </h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-[#6F86AA]">
                  Member
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap gap-10 border-b border-[#1D2B42]">
            <button
              onClick={() => setActiveTab("saved")}
              className={tabClass("saved")}
            >
              Saved Cars
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={tabClass("orders")}
            >
              Order History
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={tabClass("details")}
            >
              Account Details
            </button>
          </div>

          {activeTab === "saved" && (
            <div className="mt-10">
              {savedCars.length === 0 ? (
                <div className="rounded-2xl border border-[#203049] bg-[#0B111D] px-6 py-20 text-center">
                  <h2 className="text-3xl font-black uppercase text-white">
                    No Saved Cars Yet
                  </h2>

                  <p className="mt-3 text-[#8EA6C9]">
                    Cars you favorite from the inventory will appear here.
                  </p>

                  <Link
                    to="/cars"
                    className="mt-8 inline-block bg-[#3E66FF] px-8 py-4 text-sm font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
                  >
                    Browse Cars
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {savedCars.map((car) => {
                    const image = car.images?.[0];

                    return (
                      <article
                        key={car.id}
                        className="group overflow-hidden border border-[#203049] bg-[#0B111D] shadow-xl shadow-black/30 transition hover:border-[#3E66FF]/70"
                      >
                        <div className="relative h-52 overflow-hidden bg-[#10192A]">
                          <img
                            src={image}
                            alt={`${car.brand} ${car.model}`}
                            className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105"
                          />

                          <h3 className="absolute -top-2 right-4 text-5xl font-black uppercase text-white/5">
                            {car.brand}
                          </h3>

                          <button className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-[#263247] bg-[#0B111D]/80 text-[#3E66FF]">
                            <i className="fa-solid fa-heart text-xs"></i>
                          </button>

                          
                        </div>

                        <div className="p-6">
                          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#3E66FF]">
                            {car.brand}
                          </p>

                          <h2 className="mt-3 text-2xl font-black text-[#F5F4EA]">
                            {car.model}
                          </h2>

                          <p className="mt-2 text-sm text-[#8EA6C9]">
                            {car.engine} · {car.horsepower} HP
                          </p>

                          <div className="mt-6 flex items-center justify-between gap-4">
                            <p className="text-2xl font-black text-[#F5F4EA]">
                              ${Number(car.price).toLocaleString()}
                            </p>

                            <Link
                              to={`/cars/${car.id}`}
                              className="bg-[#3E66FF] px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition hover:bg-white hover:text-black"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "orders" && (
            <div className="mt-10 rounded-2xl border border-[#203049] bg-[#0B111D] px-6 py-20 text-center">
              <h2 className="text-3xl font-black uppercase text-white">
                No Orders Yet
              </h2>

              <p className="mt-3 text-[#8EA6C9]">
                Your completed reservations will appear here.
              </p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="border border-[#203049] bg-[#0B111D] p-6">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                  Full Name
                </p>

                <h3 className="mt-3 text-2xl font-black text-white">
                  {currentUser.name}
                </h3>
              </div>

              <div className="border border-[#203049] bg-[#0B111D] p-6">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                  Email
                </p>

                <h3 className="mt-3 text-2xl font-black text-white">
                  {currentUser.email}
                </h3>
              </div>

              <div className="border border-[#203049] bg-[#0B111D] p-6">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                  Location
                </p>

                <h3 className="mt-3 text-2xl font-black text-white">
                  {currentUser.location || "Tbilisi, Georgia"}
                </h3>
              </div>

              <div className="border border-[#203049] bg-[#0B111D] p-6">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                  Member Since
                </p>

                <h3 className="mt-3 text-2xl font-black text-white">
                  {memberYear}
                </h3>
              </div>
            </div>
          )}

        </section>
      </div>
    </main>
  );
};

export default Profile;
