import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import carsData from "../utils/cars.js";
import { getLocal, setLocal } from "../utils/localstorage.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80";

const Cars = () => {
  const carsPerPage = 10;

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [cart, setCart] = useState(getLocal("Cart") || []);
  const [favorites, setFavorites] = useState(getLocal("Favorites") || []);

  const [buttonStatus, setButtonStatus] = useState({
    id: null,
    type: "",
  });

  const buttonTimeouts = useRef({});

  useEffect(() => {
    setLocal("Cart", cart);
  }, [cart]);

  useEffect(() => {
    setLocal("Favorites", favorites);
  }, [favorites]);

  useEffect(() => {
    return () => {
      Object.values(buttonTimeouts.current).forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, []);

  const showButtonStatus = (carId, type) => {
    clearTimeout(buttonTimeouts.current[carId]);

    setButtonStatus({
      id: carId,
      type,
    });

    buttonTimeouts.current[carId] = setTimeout(() => {
      setButtonStatus((prev) =>
        prev.id === carId ? { id: null, type: "" } : prev,
      );
    }, 1200);
  };

  const addToCart = (car) => {
    const exists = cart.find((item) => item.id === car.id);

    if (exists && exists.quantity >= 2) return;

    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === car.id);

      if (exists) {
        return prevCart.map((item) =>
          item.id === car.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 2) }
            : item,
        );
      }

      return [...prevCart, { ...car, quantity: 1 }];
    });

    showButtonStatus(car.id, "added");
  };

  const isFavorite = (carId) => {
    return favorites.some((favorite) => favorite.id === carId);
  };

  const toggleFavorite = (car) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.some((favorite) => favorite.id === car.id);

      if (exists) {
        return prevFavorites.filter((favorite) => favorite.id !== car.id);
      }

      return [...prevFavorites, car];
    });
  };

  const [filters, setFilters] = useState({
    search: "",
    brand: "",
    year: "",
    fuelType: "",
    transmission: "",
    sort: "price-asc",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      brand: "",
      year: "",
      fuelType: "",
      transmission: "",
      sort: "price-asc",
    });

    setCurrentPage(1);
  };

  const brands = useMemo(() => {
    return [...new Set(carsData.map((car) => car.brand).filter(Boolean))];
  }, []);

  const years = useMemo(() => {
    return [...new Set(carsData.map((car) => car.year).filter(Boolean))].sort(
      (a, b) => b - a,
    );
  }, []);

  const fuelTypes = useMemo(() => {
    return [...new Set(carsData.map((car) => car.fuelType).filter(Boolean))];
  }, []);

  const transmissions = useMemo(() => {
    return [
      ...new Set(carsData.map((car) => car.transmission).filter(Boolean)),
    ];
  }, []);

  const filteredCars = useMemo(() => {
    const result = carsData.filter((car) => {
      const searchValue = filters.search.toLowerCase().trim();

      const searchText = `
        ${car.brand ?? ""}
        ${car.model ?? ""}
        ${car.year ?? ""}
        ${car.engine ?? ""}
        ${car.fuelType ?? ""}
        ${car.transmission ?? ""}
        ${car.color ?? ""}
        ${(car.features ?? []).join(" ")}
      `.toLowerCase();

      if (searchValue && !searchText.includes(searchValue)) return false;

      if (filters.brand && car.brand !== filters.brand) return false;

      if (filters.year && String(car.year) !== String(filters.year)) {
        return false;
      }

      if (filters.fuelType && car.fuelType !== filters.fuelType) {
        return false;
      }

      if (filters.transmission && car.transmission !== filters.transmission) {
        return false;
      }

      return true;
    });

    if (filters.sort === "price-desc") {
      return [...result].sort((a, b) => Number(b.price) - Number(a.price));
    }

    return [...result].sort((a, b) => Number(a.price) - Number(b.price));
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / carsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * carsPerPage;
  const paginatedCars = filteredCars.slice(
    startIndex,
    startIndex + carsPerPage,
  );

  const visibleStart = filteredCars.length === 0 ? 0 : startIndex + 1;
  const visibleEnd = Math.min(startIndex + carsPerPage, filteredCars.length);

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 antialiased">
      <section className="px-5 pt-16 pb-10 sm:px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="mx-auto max-w-375">
          <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-5">
                <span className="h-px w-12 bg-[#3157FF]"></span>

                <p className="text-sm font-black uppercase tracking-[0.35em] text-[#3157FF]">
                  Inventory
                </p>
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.8] tracking-tighter text-[#F5F0E6] sm:text-6xl md:text-7xl">
                Find Your Car
              </h1>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <div className="min-w-42 border border-[#263247] bg-[#0B111D] px-5 py-4">
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8EA6C9]">
                  Results
                </p>

                <p className="mt-2 text-2xl font-black text-[#F5F0E6]">
                  {filteredCars.length} Cars
                </p>
              </div>

              <div className="min-w-58 border border-[#263247] bg-[#0B111D] px-5 py-4">
                <label className="block text-xs font-black uppercase tracking-[0.25em] text-[#8EA6C9]">
                  Sort Price
                </label>

                <select
                  value={filters.sort}
                  onChange={(e) => updateFilter("sort", e.target.value)}
                  className="mt-2 h-10 w-full border border-[#263247] bg-[#07090e] px-3 text-sm font-black text-[#F5F0E6] outline-none transition focus:border-[#3157FF]"
                >
                  <option value="price-asc">Ascending</option>
                  <option value="price-desc">Descending</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
            <aside className="h-fit border-y border-[#203049] bg-[#0B111D]/70 lg:sticky lg:top-24 lg:border">
              <div className="flex items-center justify-between border-b border-[#1D2B42] p-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.35em] text-[#3157FF]">
                    Filters
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#8EA6C9]">
                    Search inventory
                  </p>
                </div>

                <button
                  onClick={() => setFiltersOpen((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center border border-[#263247] text-white transition hover:border-[#3157FF] lg:hidden"
                >
                  <i
                    className={`fa-solid fa-chevron-down text-xs transition ${
                      filtersOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>
              </div>

              <div className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
                <div className="space-y-6 p-5">
                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-[#6F86AA]">
                      Search
                    </label>

                    <div className="flex h-13 items-center gap-3 border border-[#263247] bg-[#07090e] px-4 transition focus-within:border-[#3157FF]">
                      <i className="fa-solid fa-magnifying-glass text-[#6F86AA]"></i>

                      <input
                        value={filters.search}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        type="text"
                        placeholder="Brand or model"
                        className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-[#6F86AA]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-[#6F86AA]">
                      Brand
                    </label>

                    <select
                      value={filters.brand}
                      onChange={(e) => updateFilter("brand", e.target.value)}
                      className="h-13 w-full border border-[#263247] bg-[#07090e] px-4 text-sm font-bold text-[#F5F0E6] outline-none transition focus:border-[#3157FF]"
                    >
                      <option value="">All Brands</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-[#6F86AA]">
                      Year
                    </label>

                    <select
                      value={filters.year}
                      onChange={(e) => updateFilter("year", e.target.value)}
                      className="h-13 w-full border border-[#263247] bg-[#07090e] px-4 text-sm font-bold text-[#F5F0E6] outline-none transition focus:border-[#3157FF]"
                    >
                      <option value="">Any Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-[#6F86AA]">
                      Fuel
                    </label>

                    <select
                      value={filters.fuelType}
                      onChange={(e) => updateFilter("fuelType", e.target.value)}
                      className="h-13 w-full border border-[#263247] bg-[#07090e] px-4 text-sm font-bold text-[#F5F0E6] outline-none transition focus:border-[#3157FF]"
                    >
                      <option value="">Any Fuel</option>
                      {fuelTypes.map((fuelType) => (
                        <option key={fuelType} value={fuelType}>
                          {fuelType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-3 block text-xs font-black uppercase tracking-[0.3em] text-[#6F86AA]">
                      Transmission
                    </label>

                    <select
                      value={filters.transmission}
                      onChange={(e) =>
                        updateFilter("transmission", e.target.value)
                      }
                      className="h-13 w-full border border-[#263247] bg-[#07090e] px-4 text-sm font-bold text-[#F5F0E6] outline-none transition focus:border-[#3157FF]"
                    >
                      <option value="">Any Type</option>
                      {transmissions.map((transmission) => (
                        <option key={transmission} value={transmission}>
                          {transmission}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t border-[#1D2B42] p-5">
                  <button
                    onClick={resetFilters}
                    className="h-12 w-full border border-[#263247] text-sm font-black uppercase tracking-[0.18em] text-[#F5F0E6] transition hover:border-white hover:bg-white hover:text-black"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </aside>

            <section>
              {filteredCars.length === 0 ? (
                <div className="rounded-2xl border border-[#203049] bg-[#0B111D] px-6 py-20 text-center">
                  <h2 className="text-3xl font-black uppercase text-white">
                    No Cars Found
                  </h2>

                  <p className="mt-3 text-[#8EA6C9]">
                    Try changing or resetting your filters.
                  </p>

                  <button
                    onClick={resetFilters}
                    className="mt-6 border border-white bg-white px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-transparent hover:text-white"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] justify-items-center gap-6">
                    {paginatedCars.map((car) => {
                      const primaryImg = car.images?.[0] || fallbackImage;
                      const favorite = isFavorite(car.id);

                      const cartItem = cart.find((item) => item.id === car.id);
                      const isMaxQuantity = cartItem?.quantity >= 2;

                      const isAdded =
                        buttonStatus.id === car.id &&
                        buttonStatus.type === "added" &&
                        !isMaxQuantity;

                      const monthlyPrice = Math.round(Number(car.price) / 72);

                      return (
                        <article
                          key={car.id}
                          className="group w-full max-w-140 overflow-hidden rounded-[26px] bg-[#101925] shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1"
                        >
                          <div className="relative aspect-16/10 w-full overflow-hidden rounded-t-[26px] bg-[#0B111D]">
                            <img
                              src={primaryImg}
                              alt={`${car.brand} ${car.model}`}
                              className="h-full w-full object-cover object-center transition duration-700"
                              onError={(e) => {
                                e.currentTarget.src = fallbackImage;
                              }}
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-[#101925] via-transparent to-black/25"></div>

                            <button
                              type="button"
                              onClick={() => toggleFavorite(car)}
                              aria-label={
                                favorite
                                  ? `Remove ${car.brand} ${car.model} from favorites`
                                  : `Add ${car.brand} ${car.model} to favorites`
                              }
                              className={`absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border text-lg backdrop-blur-md transition ${
                                favorite
                                  ? "border-[#3E66FF] bg-[#3E66FF] text-white"
                                  : "border-white/20 bg-black/25 text-white hover:border-white hover:bg-white hover:text-black"
                              }`}
                            >
                              <i
                                className={`${
                                  favorite ? "fa-solid" : "fa-regular"
                                } fa-heart`}
                              ></i>
                            </button>
                          </div>

                          <div className="p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h2 className="text-2xl font-black tracking-tight text-white">
                                  {car.brand}{" "}
                                  <span className="font-semibold text-[#8FB7F4]">
                                    {car.model}
                                  </span>
                                </h2>

                                <p className="mt-1 text-sm font-semibold text-[#8EA6C9]">
                                  {car.condition} · {car.color}
                                </p>
                              </div>

                              <div className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-black text-white">
                                <span className="text-[#F5C542]">★</span>
                                {Number(car.rating).toFixed(1)}
                              </div>
                            </div>

                            <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#263247]">
                              <div className="p-3">
                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6F86AA]">
                                  Mileage
                                </p>

                                <h3 className="mt-1 text-base font-black text-white">
                                  {Number(car.mileage).toLocaleString()}
                                </h3>
                              </div>

                              <div className="border-l border-[#263247] p-3">
                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6F86AA]">
                                  Year
                                </p>

                                <h3 className="mt-1 text-base font-black text-white">
                                  {car.year}
                                </h3>
                              </div>

                              <div className="border-l border-[#263247] p-3">
                                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#6F86AA]">
                                  Fuel
                                </p>

                                <h3 className="mt-1 truncate text-base font-black text-white">
                                  {car.fuelType}
                                </h3>
                              </div>
                            </div>

                            <div className="mt-6">
                              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#6F86AA]">
                                Price
                              </p>

                              <div className="mt-1 flex items-end justify-between gap-4">
                                <h3 className="text-4xl font-black tracking-tight text-white">
                                  ${Number(car.price).toLocaleString()}
                                </h3>

                                <p className="pb-1 text-sm font-bold text-[#8EA6C9]">
                                  ${monthlyPrice}/mo est.
                                </p>
                              </div>
                            </div>

                            <div className="mt-6 grid grid-cols-[0.9fr_1.1fr] gap-3">
                              <Link
                                to={`/cars/${car.id}`}
                                className="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-black text-white transition hover:border-white hover:bg-white hover:text-black"
                              >
                                View Details
                              </Link>

                              <button
                                disabled={isMaxQuantity}
                                onClick={() => {
                                  addToCart(car);
                                }}
                                className={` cursor-pointer flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-black transition-all duration-300 ${
                                  isMaxQuantity
                                    ? "cursor-not-allowed border border-[#00E676]/40 bg-[#00E676]/10 text-[#00E676]"
                                    : isAdded
                                      ? "bg-[#00E676] text-black shadow-[0_0_20px_rgba(0,230,118,0.4)]"
                                      : "bg-[#F5F7FB] text-[#0B111D] hover:bg-[#00E676] hover:text-black"
                                }`}
                              >
                                {!isMaxQuantity && (
                                  <i className="fa-solid fa-cart-shopping text-base"></i>
                                )}

                                {isMaxQuantity
                                  ? "Max"
                                  : isAdded
                                    ? "Added ✓"
                                    : "Add to Cart"}
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12 flex flex-col items-center justify-between gap-5 sm:flex-row">
                      <button
                        disabled={currentPage === 1}
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        className={`h-12 border px-7 text-sm font-black uppercase tracking-[0.22em] transition ${
                          currentPage === 1
                            ? "cursor-not-allowed border-[#263247] text-[#6F86AA]/50"
                            : "border-[#263247] text-[#F5F0E6] hover:border-white hover:bg-white hover:text-black"
                        }`}
                      >
                        Prev
                      </button>

                      <div className="flex flex-wrap justify-center gap-3">
                        {Array.from({ length: totalPages }, (_, index) => {
                          const page = index + 1;

                          return (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`h-12 w-12 border text-sm font-black transition ${
                                currentPage === page
                                  ? "border-[#3157FF] bg-[#3157FF] text-white"
                                  : "border-[#263247] text-[#8EA6C9] hover:border-white hover:text-white"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                        className={`h-12 border px-7 text-sm font-black uppercase tracking-[0.22em] transition ${
                          currentPage === totalPages
                            ? "cursor-not-allowed border-[#263247] text-[#6F86AA]/50"
                            : "border-[#263247] text-[#F5F0E6] hover:border-white hover:bg-white hover:text-black"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cars;