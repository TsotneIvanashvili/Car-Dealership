import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import carsData from "../utils/cars.js";
import { getLocal, setLocal } from "../utils/localstorage.js";

const CarDetails = () => {
  const { id } = useParams();

  const car = carsData.find((item) => item.id === Number(id));

  const [cart, setCart] = useState(getLocal("Cart") || []);
  const [added, setAdded] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroImages = useMemo(() => {
    if (!car?.images?.length) return [];
    return car.images;
  }, [car]);

  useEffect(() => {
    setLocal("Cart", cart);
  }, [cart]);

  useEffect(() => {
    setHeroIndex(0);
  }, [id]);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const cartItem = car ? cart.find((item) => item.id === car.id) : null;
  const isMaxQuantity = cartItem?.quantity >= 2;
  const isInCart = Boolean(cartItem);

  const performanceStats = useMemo(() => {
    if (!car) return [];

    const horsepower = Number(car.horsepower);

    const acceleration =
      horsepower >= 500
        ? "3.5 s"
        : horsepower >= 400
          ? "4.2 s"
          : horsepower >= 300
            ? "5.1 s"
            : "6.4 s";

    const topSpeed =
      horsepower >= 500
        ? "290 km/h"
        : horsepower >= 400
          ? "270 km/h"
          : horsepower >= 300
            ? "245 km/h"
            : "220 km/h";

    const transmission =
      car.transmission === "Manual" ? "6-speed Manual" : "8-speed Automatic";

    const drivetrain =
      car.fuelType === "Electric"
        ? "Dual Motor AWD"
        : horsepower >= 400
          ? "Rear-wheel drive"
          : "Front-wheel drive";

    return [
      {
        label: "Power",
        value: `${car.horsepower} HP`,
      },
      {
        label: "0-100 KM/H",
        value: acceleration,
      },
      {
        label: "Top Speed",
        value: topSpeed,
      },
      {
        label: "Drivetrain",
        value: drivetrain,
      },
      {
        label: "Transmission",
        value: transmission,
      },
      {
        label: "Engine",
        value: car.engine,
      },
    ];
  }, [car]);

  if (!car) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#07090e] px-6 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black uppercase md:text-5xl">
            Car Not Found
          </h1>

          <Link
            to="/cars"
            className="mt-6 inline-block border-2 border-white bg-white px-8 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-transparent hover:text-white"
          >
            Back To Cars
          </Link>
        </div>
      </main>
    );
  }

  const addToCart = () => {
    if (isMaxQuantity) return;

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

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#07090e] text-white">
      <section className="relative min-h-[92vh] overflow-hidden bg-[#071022] px-5 pt-24 sm:min-h-screen sm:px-8 md:px-16 lg:px-24">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`${car.brand} ${car.model} ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                heroIndex === index
                  ? "scale-100 opacity-55"
                  : "scale-105 opacity-0"
              }`}
            />
          ))}
        </div>

        <div className="relative z-20 mx-auto flex min-h-[calc(92vh-6rem)] max-w-7xl flex-col justify-between pb-10 sm:min-h-[calc(100vh-6rem)]">
          <Link
            to="/cars"
            className="inline-flex w-fit items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#8EA6C9] transition hover:text-white sm:text-sm sm:tracking-[0.25em]"
          >
            ← Back To Garage
          </Link>

          <div className="pb-8">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-[#3157FF] sm:text-sm sm:tracking-[0.4em]">
              {car.brand} ·
            </p>

            <h1 className="max-w-6xl wrap-break-word text-[clamp(2.75rem,13vw,12rem)] font-black uppercase leading-[0.85] tracking-[-0.06em] text-[#F5F0E6]">
              {car.model}
            </h1>
          </div>

          {heroImages.length > 1 && (
            <div className="flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setHeroIndex(index)}
                  className={`h-1 transition-all duration-500 ${
                    heroIndex === index
                      ? "w-12 bg-[#3157FF]"
                      : "w-5 bg-white/25 hover:bg-white/50"
                  }`}
                ></button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#0B111D] px-5 py-10 sm:px-8 md:px-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#F5F0E6] sm:text-5xl md:text-6xl">
              ${Number(car.price).toLocaleString()}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex">
            <Link
              to="/cars"
              className="flex h-14 items-center justify-center border border-[#263247] px-6 text-center text-xs font-black uppercase tracking-[0.22em] text-white transition hover:border-white sm:h-16 sm:px-10 sm:text-sm"
            >
              Explore Cars
            </Link>

            <button
              disabled={isMaxQuantity}
              onClick={addToCart}
              className={`h-14 px-6 text-xs font-black uppercase tracking-[0.22em] transition-all duration-300 sm:h-16 sm:px-10 sm:text-sm ${
                isMaxQuantity
                  ? "cursor-not-allowed border border-[#00E676]/40 bg-[#00E676]/15 text-[#00E676]"
                  : added
                    ? "bg-[#00E676] text-black shadow-[0_0_24px_rgba(0,230,118,0.45)]"
                    : isInCart
                      ? "bg-[#F5F0E6] text-black hover:bg-[#00E676]"
                      : "bg-[#F5F0E6] text-black hover:bg-[#3157FF] hover:text-white"
              }`}
            >
              {isMaxQuantity
                ? "Max Quantity Reached"
                : added
                  ? "Added ✓"
                  : isInCart
                    ? "Add One More"
                    : "Add To Cart"}
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#3157FF] px-5 py-12 text-white sm:px-8 md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {performanceStats.map((stat) => (
            <div key={stat.label} className="min-w-0">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/55">
                {stat.label}
              </p>

              <h3 className="mt-4 wrap-break-word text-2xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                {stat.value}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#07090e] px-5 py-20 sm:px-8 md:px-16 md:py-28 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <div className="mb-8 flex items-center gap-5">
              <span className="h-px w-10 bg-[#3157FF] sm:w-12"></span>

              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#3157FF] sm:text-sm sm:tracking-[0.35em]">
                The Machine
              </p>
            </div>

            <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.04em] text-[#F5F0E6] sm:text-5xl md:text-6xl">
              Built To Be Driven
            </h2>

            <p className="mt-8 max-w-2xl text-base font-medium leading-8 text-[#C7D4EF] sm:text-lg sm:leading-9">
              A meticulously prepared example, inspected against our high
              standard and delivered ready for the road. Every detail — from
              power delivery to interior feel — is selected for drivers who
              measure a car by how it feels, not just how it looks.
            </p>
          </div>

          <div>
            <div className="mb-8 flex items-center gap-5">
              <span className="h-px w-10 bg-[#3157FF] sm:w-12"></span>

              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#3157FF] sm:text-sm sm:tracking-[0.35em]">
                Highlights
              </p>
            </div>

            <div className="border-t border-white/10">
              {(car.features || []).map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-5 border-b border-white/10 py-5 sm:py-6"
                >
                  <span className="h-2 w-2 shrink-0 bg-[#3157FF]"></span>

                  <p className="text-base font-semibold text-[#E8EEF9] sm:text-lg">
                    {feature}
                  </p>
                </div>
              ))}

              {[
                "170-point inspection passed",
                "Trade-in welcome",
                "Fully refundable reservation deposit",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-5 border-b border-white/10 py-5 sm:py-6"
                >
                  <span className="h-2 w-2 shrink-0 bg-[#3157FF]"></span>

                  <p className="text-base font-semibold text-[#E8EEF9] sm:text-lg">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {car.images?.length > 0 && (
        <section className="bg-[#07090e] px-5 pb-20 sm:px-8 md:px-16 md:pb-28 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center gap-5">
              <span className="h-px w-10 bg-[#3157FF] sm:w-12"></span>

              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#3157FF] sm:text-sm sm:tracking-[0.35em]">
                Gallery
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {car.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="h-60 overflow-hidden bg-[#0B111D] sm:h-80 lg:h-90"
                >
                  <img
                    src={image}
                    alt={`${car.brand} ${car.model} ${index + 1}`}
                    className="h-full w-full object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CarDetails;
