import { useEffect, useState } from "react";
import "../App.css";
import HeroSection from "../components/Hero";
import { Link } from "react-router-dom";

const HomePage = () => {
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

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cars.length]);

  const carNames = [
    "BMW",
    "Mercedes",
    "Porsche",
    "Audi",
    "Lamborghini",
    "Ferrari",
  ];

  return (
    <div>
      <HeroSection />

      <p className="text-[200px] text-white text-center font-[Bebas_Neue]">
        Featured Brands
      </p>

      <div className="w-full overflow-hidden bg-black py-6 mt-3.5">
        <div className="flex w-max animate-left">
          <div className="flex shrink-0">
            {carNames.map((name, index) => (
              <p
                key={index}
                className="mx-10 shrink-0 whitespace-nowrap text-3xl font-bold font-[Bebas_Neue] uppercase tracking-widest text-white/80"
              >
                {name}
              </p>
            ))}
          </div>

          <div className="flex shrink-0">
            {carNames.map((name, index) => (
              <p
                key={index}
                className="mx-10 shrink-0 whitespace-nowrap text-3xl font-bold font-[Bebas_Neue] uppercase text-white"
              >
                {name}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative w-full h-screen overflow-hidden bg-black">
        {cars.map((car, i) => (
          <div
            key={i}
            className={`absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === i ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${car.image})`,
            }}
          ></div>
        ))}

        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex h-full items-center px-10 md:px-20">
          <div
            key={index}
            className="max-w-xl animate-[fadeSlide_1s_ease-in-out]"
          >
            <p className=" font-[Bebas_Neue_serif] mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-white/60">
              Featured
            </p>

            <h1 className=" font-[Bebas_Neue_serif]  text-9xl font-bold text-white">
              {cars[index].name}
            </h1>

            <p className="mt-6 text-base leading-8 font-[Bebas_Neue_serif] text-white/70 md:text-lg">
              {cars[index].description}
            </p>

            <div className="mt-20">
              <Link
                to={"/products"}
                className=" rounded-full border border-white shadow-[2px_2px_5px_black] bg-white px-8 py-3 font-semibold text-black transition duration-300 hover:bg-transparent hover:text-white"
              >
                View More
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 z-20 flex gap-3 md:left-20">
          {cars.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === i ? "w-10 bg-white" : "w-3 bg-white/40"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
