import { useMemo, useState } from "react";
import carsData from "../utils/cars.js";

const fallbackImage =
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80";

const Cars = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const conditions = useMemo(() => {
    return [...new Set(carsData.map((car) => car.condition).filter(Boolean))];
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

      if (
        filters.transmission &&
        car.transmission !== filters.transmission
      ) {
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

                  <div className="flex h-[52px] items-center gap-3 rounded-lg border border-[#203049] bg-[#080D16] px-4 transition focus-within:border-[#F5C542]">
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
                    className="h-[52px] w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-[#B8C7E0] outline-none transition focus:border-[#F5C542]"
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
                    onChange={(e) =>
                      updateFilter("minPrice", e.target.value)
                    }
                    type="number"
                    placeholder="$20,000"
                    className="h-[52px] w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#53647F] focus:border-[#F5C542]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Max Price
                  </label>

                  <input
                    value={filters.maxPrice}
                    onChange={(e) =>
                      updateFilter("maxPrice", e.target.value)
                    }
                    type="number"
                    placeholder="$90,000"
                    className="h-[52px] w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-white outline-none transition placeholder:text-[#53647F] focus:border-[#F5C542]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Year
                  </label>

                  <select
                    value={filters.year}
                    onChange={(e) => updateFilter("year", e.target.value)}
                    className="h-[52px] w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-[#B8C7E0] outline-none transition focus:border-[#F5C542]"
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
                    onChange={(e) =>
                      updateFilter("fuelType", e.target.value)
                    }
                    className="h-[52px] w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-[#B8C7E0] outline-none transition focus:border-[#F5C542]"
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
                    className="h-[52px] w-full rounded-lg border border-[#203049] bg-[#080D16] px-4 text-sm font-semibold text-[#B8C7E0] outline-none transition focus:border-[#F5C542]"
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
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map((car) => {
              const primaryImg = car.images?.[0] || fallbackImage;

              return (
                <div
                  key={car.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800/70 bg-[#0d131f] shadow-xl transition-all duration-300 hover:border-slate-700/90"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={primaryImg}
                      alt={`${car.brand} ${car.model}`}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                    />

                    <div className="absolute left-3 top-3 rounded border border-amber-500/30 bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 backdrop-blur">
                      {car.condition}
                    </div>

                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-medium text-slate-200 backdrop-blur">
                      <span className="text-amber-400">★</span>
                      {Number(car.rating).toFixed(1)}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <p className="mb-1 text-[11px] font-medium tracking-wide text-slate-400">
                        {car.year} • {car.engine} • {car.horsepower} HP
                      </p>

                      <h2 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-amber-400">
                        {car.brand}{" "}
                        <span className="font-light text-slate-300">
                          {car.model}
                        </span>
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-1">
                        <span className="rounded border border-slate-800/40 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
                          {car.transmission}
                        </span>

                        <span className="rounded border border-slate-800/40 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
                          {car.fuelType}
                        </span>

                        <span className="rounded border border-slate-800/40 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
                          {car.color}
                        </span>
                      </div>

                      <div className="mt-4 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                          Highlights
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          {(car.features ?? []).join(" • ")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-800/60 pt-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">
                          {Number(car.mileage).toLocaleString()} miles
                        </p>

                        <p className="text-lg font-extrabold tracking-tight text-white">
                          ${Number(car.price).toLocaleString()}
                        </p>
                      </div>

                      <button className="rounded bg-slate-100 px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-950 transition-colors hover:bg-amber-500 hover:text-slate-950">
                        Explore Assets
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;