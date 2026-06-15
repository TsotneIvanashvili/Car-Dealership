import { useEffect, useState } from "react";
import "../App.css";
import HeroSection from "../components/Hero";
import { Link } from "react-router-dom";
import ScrollVelocity from "../components/Animated/ScrollVelocity";
  
const cars = [
  {
    image: "/Main/Bmw.png",
    name: "BMW M3 Competition",
    description:
      "A powerful sports sedan with aggressive styling, sharp handling, and premium performance built for drivers who want speed and luxury.",
  },
  {
    image: "/Main/Merc.png",
    name: "Mercedes-AMG GT",
    description:
      "A sleek performance coupe with bold design, refined power, and a dramatic road presence made for pure driving excitement.",
  },
  {
    image: "/Main/Porsche.png",
    name: "Porsche 911 Turbo",
    description:
      "An iconic red sports car with timeless design, explosive acceleration, and precision engineering made for true enthusiasts.",
  },
];

const carNames = ["BMW", "MERCEDES", "PORSCHE", "AUDI", "LAMBORGHINI", "FERRARI"];
const txt = carNames.join("   •   ");

const HomePage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0E0F13] min-h-screen text-[#F5F4F1] overflow-x-hidden">
      <HeroSection />

      <section className="relative py-28 bg-[#16181F] border-y border-white/5 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, #CBA45A 0%, transparent 70%)",
          }}
        ></div>

        <div className="relative">
          <h2
            className="text-[#F5F4F1] text-center uppercase tracking-[0.2em] text-3xl md:text-4xl lg:text-5xl opacity-95"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Featured Brands
          </h2>

          <div className="mx-auto mt-5 mb-16 h-px w-16 bg-[#CBA45A]/70"></div>

          <div
            className="relative w-full flex flex-col gap-10 py-4"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <ScrollVelocity
              texts={[txt]}
              velocity={30}
              className="text-[#C9C9C9] text-5xl md:text-7xl font-black uppercase tracking-widest leading-none"
            />
            <ScrollVelocity
              texts={[txt]}
              velocity={-30}
              className="text-[#7B7E88] text-5xl md:text-7xl font-black uppercase tracking-widest leading-none"
            />
          </div>
        </div>
      </section>

      <div className="relative w-full h-screen overflow-hidden bg-[#0E0F13]">
        {cars.map((car, i) => (
          <div
            key={i}
            className={`absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
              index === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `url(${car.image})`,
            }}
          ></div>
        ))}

        <div className="absolute inset-0 bg-linear-to-r from-[#08090C] via-[#08090C]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#08090C] via-transparent to-transparent"></div>

        <div className="relative z-10 flex h-full items-center px-8 md:px-16 lg:px-24">
          <div
            key={index}
            className="max-w-2xl transition-all duration-700 animate-[fadeSlide_1s_ease-in-out]"
          >
            <p className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-[#CBA45A]">
              <span className="h-px w-8 bg-[#CBA45A]"></span>
              Featured Vehicle
            </p>

            <h3
              className="text-[#F5F4F1] font-black uppercase tracking-tight text-5xl md:text-7xl lg:text-8xl leading-none"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {cars[index].name}
            </h3>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#94A3B8] max-w-xl font-medium">
              {cars[index].description}
            </p>

            <div className="mt-10">
              <Link
                to={"/products"}
                className="group inline-flex items-center gap-2 text-black bg-[#F5F4F1] px-8 h-12 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-[#E3C57E] transition-colors duration-300 shadow-xl"
              >
                View Details
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 z-20 flex gap-2">
          {cars.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-0.75 transition-all duration-500 ease-out cursor-pointer ${
                index === i
                  ? "w-12 bg-[#CBA45A]"
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;