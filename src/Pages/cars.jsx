import carsData from "../utils/cars";

const fallbackImage =
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=600&q=80";

const getImageUrl = (image) => {
  if (!image) return fallbackImage;

  const cleanImage = image.trim();

  if (cleanImage.startsWith("http")) {
    return cleanImage;
  }

  return `${import.meta.env.BASE_URL}${cleanImage.replace(/^\/+/, "")}`;
};

const Cars = () => {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 antialiased font-sans">
      <header className="border-b border-slate-800/60 bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-amber-500 uppercase">
              Premium Inventory
            </p>

            <h1 className="text-2xl font-extrabold tracking-tight text-white mt-0.5">
              Available Cars: {carsData.length}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {carsData.map((car) => {
            const primaryImg = getImageUrl(car.images?.[0]);

            return (
              <div
                key={car.id}
                className="group bg-[#0d131f] border border-slate-800/70 rounded-xl overflow-hidden hover:border-slate-700/90 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div className="aspect-video w-full bg-slate-950 overflow-hidden relative">
                  <img
                    src={primaryImg}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />

                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-[10px] text-amber-400 px-2 py-0.5 font-bold tracking-wider rounded border border-amber-500/30 uppercase">
                    {car.condition}
                  </div>

                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur text-[10px] text-slate-200 px-2 py-0.5 font-medium rounded flex items-center gap-1">
                    <span className="text-amber-400">★</span>{" "}
                    {car.rating.toFixed(1)}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium tracking-wide mb-1">
                      {car.year} • {car.engine} • {car.horsepower} HP
                    </p>

                    <h2 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-400 transition-colors">
                      {car.brand}{" "}
                      <span className="font-light text-slate-300">
                        {car.model}
                      </span>
                    </h2>

                    <div className="flex flex-wrap gap-1 mt-3">
                      <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800/40">
                        {car.transmission}
                      </span>

                      <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800/40">
                        {car.fuelType}
                      </span>

                      <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800/40">
                        {car.color}
                      </span>
                    </div>

                    <div className="mt-4 space-y-1">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                        Highlights
                      </p>

                      <p className="text-xs text-slate-400 truncate">
                        {car.features.join(" • ")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                        {car.mileage.toLocaleString()} miles
                      </p>

                      <p className="text-lg font-extrabold text-white tracking-tight">
                        ${car.price.toLocaleString()}
                      </p>
                    </div>

                    <button className="bg-slate-100 text-slate-950 font-bold text-[11px] px-3.5 py-2 rounded hover:bg-amber-500 hover:text-slate-950 transition-colors uppercase tracking-wider">
                      Explore Assets
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Cars;