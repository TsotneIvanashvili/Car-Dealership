import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import carsData from "../utils/cars.js";
import { getLocal, setLocal } from "../utils/localstorage.js";

const CarDetails = () => {
  const { id } = useParams();

  const car = carsData.find((item) => item.id === Number(id));

  const [selectedImage, setSelectedImage] = useState(car?.images?.[0] || "");
  const [cart, setCart] = useState(getLocal("Cart") || []);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLocal("Cart", cart);
  }, [cart]);

  if (!car) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07090e] px-6 text-white">
        <div className="text-center">
          <h1 className="text-5xl font-black uppercase">Car Not Found</h1>

          <Link
            to="/cars"
            className="mt-6 inline-block rounded-lg bg-white px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#F5C542]"
          >
            Back To Cars
          </Link>
        </div>
      </main>
    );
  }

  const cartItem = cart.find((item) => item.id === car.id);
  const isMaxQuantity = cartItem?.quantity >= 2;
  const isInCart = Boolean(cartItem);

  const addToCart = () => {
    if (isMaxQuantity) return;

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

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  const specs = [
    {
      label: "Engine",
      value: car.engine,
    },
    {
      label: "Power",
      value: `${car.horsepower} HP`,
    },
    {
      label: "Gearbox",
      value: car.transmission,
    },
    {
      label: "Fuel",
      value: car.fuelType,
    },
    {
      label: "Mileage",
      value: `${Number(car.mileage).toLocaleString()} miles`,
    },
    {
      label: "Color",
      value: car.color,
    },
    {
      label: "Condition",
      value: car.condition,
    },
    {
      label: "Year",
      value: car.year,
    },
  ];

  return (
    <main className="min-h-screen bg-[#07090e] px-5 py-28 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/cars"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#8EA6C9] transition hover:text-white"
        >
          <span>←</span>
          Back to all cars
        </Link>

        <section className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-[#203049] bg-[#0B111D] shadow-2xl shadow-black/40">
              <div className="absolute left-6 top-6 z-10 rounded-md bg-[#F5C542] px-4 py-2 text-xs font-black uppercase tracking-widest text-black">
                {car.condition}
              </div>

              <img
                src={selectedImage}
                alt={`${car.brand} ${car.model}`}
                className="h-130 w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#07090e]/40 via-transparent to-transparent"></div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-4">
              {(car.images || []).slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`h-28 overflow-hidden rounded-2xl border bg-[#0B111D] transition ${
                    selectedImage === image
                      ? "border-[#F5C542]"
                      : "border-[#203049] hover:border-white/40"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.brand} ${car.model} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-black uppercase">Specification</h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-2xl border border-[#203049] bg-[#0B111D] p-5 shadow-xl shadow-black/20"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-[#6F86AA]">
                      {spec.label}
                    </p>

                    <h3 className="mt-3 text-xl font-black text-white">
                      {spec.value}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-[#F5C542]">
                  {car.brand}
                </p>

                <h1 className="mt-3 text-5xl font-black leading-none tracking-tight md:text-6xl">
                  {car.model}
                </h1>

                <p className="mt-5 text-lg text-[#8EA6C9]">
                  {car.year} · {car.fuelType} · {car.color} ·{" "}
                  {Number(car.mileage).toLocaleString()} miles
                </p>
              </div>

              <div className="shrink-0 rounded-md bg-[#0B111D] px-3 py-2 text-sm font-bold text-white">
                <span className="text-[#F5C542]">★</span>{" "}
                {Number(car.rating).toFixed(1)} rating
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#203049] bg-[#0B111D] p-7 shadow-2xl shadow-black/40">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-[#6F86AA]">
                    Drive-away price
                  </p>

                  <h2 className="mt-3 text-5xl font-black text-white">
                    ${Number(car.price).toLocaleString()}
                  </h2>
                </div>

                <span className="rounded-full bg-[#10192A] px-4 py-2 text-xs font-black text-[#F5C542]">
                  No hidden fees
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {isMaxQuantity ? (
                <button
                  disabled
                  className="h-15 cursor-not-allowed rounded-2xl border border-[#00E676]/40 bg-[#00E676]/15 text-sm font-black uppercase tracking-wider text-[#00E676]"
                >
                  Max Quantity Reached
                </button>
              ) : (
                <button
                  onClick={addToCart}
                  className={`h-15 rounded-2xl text-sm font-black uppercase tracking-wider transition-all duration-300 ${
                    added
                      ? "bg-[#00E676] text-black shadow-[0_0_25px_rgba(0,230,118,0.45)]"
                      : isInCart
                      ? "bg-[#F5C542] text-black hover:bg-[#00E676]"
                      : "bg-white text-black hover:bg-[#00E676]"
                  }`}
                >
                  {added ? "Added ✓" : isInCart ? "Add One More" : "Add To Cart"}
                </button>
              )}

              <button className="h-15 rounded-2xl border border-[#203049] bg-transparent text-sm font-black uppercase tracking-wider text-white transition hover:border-white">
                Book a test drive
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                What it comes with
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {(car.features || []).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-[#10192A] px-4 py-2 text-sm font-semibold text-[#9BB7E5]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-[#1b3d2b] bg-[#07150f] p-6">
              <ul className="space-y-4 text-sm font-semibold text-[#A7F3C4]">
                <li>✓ 170-point inspection passed</li>
                <li>✓ Free concierge delivery</li>
                <li>✓ Trade-in welcome</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default CarDetails;
