import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import carsData from "../utils/cars.js";
import { getLocal, setLocal } from "../utils/localstorage.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80";

const Cars = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
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
        prev.id === carId ? { id: null, type: "" } : prev
      );
    }, 1200);
  };

  const addToCart = (car) => {
    const exists = cart.find((item) => item.id === car.id);

    if (exists && exists.quantity >= 2) {
      return;
    }

    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === car.id);

      if (exists) {
        return prevCart.map((item) =>
          item.id === car.id
            ? { ...item, quantity: Math.min(item.quantity + 1, 2) }
            : item
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
    condition: "",
    minPrice: "",
    maxPrice: "",
    year: "",
    fuelType: "",
    transmission: "",
    minHorsepower: "",
    maxMileage: "",
    minRating: "",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      brand: "",
      condition: "",
      minPrice: "",
      maxPrice: "",
      year: "",
      fuelType: "",
      transmission: "",
      minHorsepower: "",
      maxMileage: "",
      minRating: "",
    });
  };

  const brands = useMemo(() => {
    return [...new Set(carsData.map((car) => car.brand).filter(Boolean))];
  }, []);

  const years = useMemo(() => {
    return [...new Set(carsData.map((car) => car.year).filter(Boolean))].sort(
      (a, b) => b - a
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
    return carsData.filter((car) => {
      const searchValue = filters.search.toLowerCase().trim();

      const searchText = `
        ${car.brand ?? ""}
        ${car.model ?? ""}
        ${car.year ?? ""}
        ${car.engine ?? ""}
        ${car.fuelType ?? ""}
        ${car.transmission ?? ""}
        ${car.color ?? ""}
        ${car.condition ?? ""}
        ${(car.features ?? []).join(" ")}
      `.toLowerCase();

      if (searchValue && !searchText.includes(searchValue)) return false;

      if (filters.brand && car.brand !== filters.brand) return false;

      if (filters.condition && car.condition !== filters.condition) {
        return false;
      }

      if (filters.year && String(car.year) !== String(filters.year)) {
        return false;
      }

      if (filters.fuelType && car.fuelType !== filters.fuelType) {
        return false;
      }

      if (filters.transmission && car.transmission !== filters.transmission) {
        return false;
      }

      if (filters.minPrice && Number(car.price) < Number(filters.minPrice)) {
        return false;
      }

      if (filters.maxPrice && Number(car.price) > Number(filters.maxPrice)) {
        return false;
      }

      if (
        filters.minHorsepower &&
        Number(car.horsepower) < Number(filters.minHorsepower)
      ) {
        return false;
      }

      if (
        filters.maxMileage &&
        Number(car.mileage) > Number(filters.maxMileage)
      ) {
        return false;
      }

      if (filters.minRating && Number(car.rating) < Number(filters.minRating)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="flex min-h-screen flex-col bg-[#07090e] text-slate-100 antialiased font-sans">
      <section className="relative overflow-hidden px-6 py-16 text-white md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">
                Find Your Car
              </h2>
            </div>
          </div>

          <div className="rounded-2xl border border-[#203049] bg-[#0B111D] p-5 shadow-2xl shadow-black/40">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1D2B42] pb-5">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[#F5C542] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                  Filters
                </span>

                <span className="text-sm font-semibold text-[#8EA6C9]">
                  {filteredCars.length} Cars Found
                </span>
              </div>

              <button
                onClick={() => setFiltersOpen((prev) => !prev)}
                className="flex h-10 items-center gap-3 rounded-md border border-[#203049] px-4 text-sm font-black uppercase tracking-wider text-white lg:hidden"
              >
                {filtersOpen ? "Close" : "Open"}
                <i
                  className={`fa-solid fa-chevron-down text-xs transition ${
                    filtersOpen ? "rotate-180" : ""
                  }`}
                ></i>
              </button>

              <div className="hidden rounded-md bg-[#121B2B] px-3 py-1 text-sm font-bold text-white lg:block">
                <span className="text-[#F5C542]">{carsData.length}</span> Cars
                Available
              </div>
            </div>

            <div className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Search
                  </label>

                  <div className="flex h-13 items-center gap-3 rounded-lg border border-[#203049] bg-[#080D16] px-4 transition focus-within:border-[#F5C542]">
                    <i className="fa-solid fa-magnifying-glass text-[#6F86AA]"></i>

                    <input
                      value={filters.search}
                      onChange={(e) => updateFilter("search", e.target.value)}
                      type="text"
                      placeholder="Search by brand or model"
                      className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-[#53647F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Brand
                  </label>

                  <select
                    value={filters.brand}
                    onChange={(e) => updateFilter("brand", e.target.value)}
                    className="h-13 w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-[#B8C7E0] outline-none transition focus:border-[#F5C542]"
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
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Min Price
                  </label>

                  <input
                    value={filters.minPrice}
                    onChange={(e) => updateFilter("minPrice", e.target.value)}
                    type="number"
                    placeholder="$20,000"
                    className="h-13 w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#53647F] focus:border-[#F5C542]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Max Price
                  </label>

                  <input
                    value={filters.maxPrice}
                    onChange={(e) => updateFilter("maxPrice", e.target.value)}
                    type="number"
                    placeholder="$90,000"
                    className="h-13 w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#53647F] focus:border-[#F5C542]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Year
                  </label>

                  <select
                    value={filters.year}
                    onChange={(e) => updateFilter("year", e.target.value)}
                    className="h-13 w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-[#B8C7E0] outline-none transition focus:border-[#F5C542]"
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
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Fuel Type
                  </label>

                  <select
                    value={filters.fuelType}
                    onChange={(e) => updateFilter("fuelType", e.target.value)}
                    className="h-13 w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-[#B8C7E0] outline-none transition focus:border-[#F5C542]"
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
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Transmission
                  </label>

                  <select
                    value={filters.transmission}
                    onChange={(e) =>
                      updateFilter("transmission", e.target.value)
                    }
                    className="h-13 w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-[#B8C7E0] outline-none transition focus:border-[#F5C542]"
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

              <div className="mt-6 flex flex-col justify-between gap-5 border-t border-[#1D2B42] pt-6 lg:flex-row lg:items-center">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      updateFilter(
                        "transmission",
                        filters.transmission === "Automatic" ? "" : "Automatic"
                      )
                    }
                    className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                      filters.transmission === "Automatic"
                        ? "bg-[#F5C542] text-black"
                        : "bg-[#10192A] text-[#9BB7E5] hover:bg-[#16233A]"
                    }`}
                  >
                    Automatic
                  </button>

                  <button
                    onClick={() =>
                      updateFilter(
                        "fuelType",
                        filters.fuelType === "Petrol" ? "" : "Petrol"
                      )
                    }
                    className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                      filters.fuelType === "Petrol"
                        ? "bg-[#F5C542] text-black"
                        : "bg-[#10192A] text-[#9BB7E5] hover:bg-[#16233A]"
                    }`}
                  >
                    Petrol
                  </button>

                  <button
                    onClick={() =>
                      updateFilter(
                        "minHorsepower",
                        filters.minHorsepower === "200" ? "" : "200"
                      )
                    }
                    className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                      filters.minHorsepower === "200"
                        ? "bg-[#F5C542] text-black"
                        : "bg-[#10192A] text-[#9BB7E5] hover:bg-[#16233A]"
                    }`}
                  >
                    200+ HP
                  </button>

                  <button
                    onClick={() =>
                      updateFilter(
                        "maxMileage",
                        filters.maxMileage === "20000" ? "" : "20000"
                      )
                    }
                    className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                      filters.maxMileage === "20000"
                        ? "bg-[#F5C542] text-black"
                        : "bg-[#10192A] text-[#9BB7E5] hover:bg-[#16233A]"
                    }`}
                  >
                    Under 20,000 Miles
                  </button>

                  <button
                    onClick={() =>
                      updateFilter(
                        "minRating",
                        filters.minRating === "4.5" ? "" : "4.5"
                      )
                    }
                    className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                      filters.minRating === "4.5"
                        ? "bg-[#F5C542] text-black"
                        : "bg-[#10192A] text-[#9BB7E5] hover:bg-[#16233A]"
                    }`}
                  >
                    4.5+ Rating
                  </button>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetFilters}
                    className="h-12 rounded-lg border border-[#203049] px-6 text-sm font-black uppercase tracking-wider text-[#B8C7E0] transition hover:border-white hover:text-white"
                  >
                    Reset
                  </button>

                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="h-12 rounded-lg bg-white px-8 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#F5C542] lg:hidden"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {filteredCars.length === 0 ? (
        <div className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#203049] bg-[#0B111D] px-6 py-20 text-center">
            <h2 className="text-3xl font-black uppercase text-white">
              No Cars Found
            </h2>

            <p className="mt-3 text-[#8EA6C9]">
              Try changing or resetting your filters.
            </p>

            <button
              onClick={resetFilters}
              className="mt-6 rounded-lg bg-white px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#F5C542]"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-325 px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => {
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
                  className="group overflow-hidden rounded-[26px]  bg-[#101925] shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 "
                >
                  <div className="relative h-57.5 overflow-hidden rounded-t-[26px] bg-[#0B111D]">
                    <img
                      src={primaryImg}
                      alt={`${car.brand} ${car.model}`}
                      className="h-full w-full object-cover  transition duration-700 "
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#101925] via-transparent to-black/25"></div>

                    <div className="absolute left-4 top-4 flex h-8 items-center gap-2 rounded-full border border-white/10 bg-[#111827]/85 px-3 backdrop-blur-md">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#38E07B] shadow-[0_0_12px_rgba(56,224,123,0.8)]"></span>

                      <span className="text-xs font-black uppercase tracking-wider text-white">
                        Certified
                      </span>
                    </div>

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
                        className={`flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-black transition-all duration-300 ${
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
        </div>
      )}
    </div>
  );
};

export default Cars;