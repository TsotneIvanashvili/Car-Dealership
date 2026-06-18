import { useEffect, useRef, useState } from "react";
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
    name: "Mercedes AMG GT",
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

const carNames = [
  "BMW",
  "MERCEDES",
  "PORSCHE",
  "AUDI",
  "LAMBORGHINI",
  "FERRARI",
];

const txt = carNames.join("   •   ");

const RevealText = ({
  children,
  as: Tag = "div",
  className = "",
  style = {},
  delay = "0ms",
}) => {
  const textRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={textRef}
      className={`text-reveal ${visible ? "text-visible" : ""} ${className}`}
      style={{
        ...style,
        transitionDelay: delay,
      }}
    >
      {children}
    </Tag>
  );
};

const HomePage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cars.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0E0F13] text-[#F5F4F1]">
      <HeroSection />

      <section className="relative overflow-hidden bg-[#16181F]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-[0.07]"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, #CBA45A 0%, transparent 70%)",
          }}
        ></div>

        <div className="relative flex flex-col items-center justify-center gap-6 md:gap-10 bg-[#010619] p-10">
          <RevealText
            as="h2"
            className="text-center text-3xl sm:text-4xl md:text-5xl uppercase text-white opacity-95"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            Featured Brands
          </RevealText>

          <div
            className="relative"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
            }}
          >
            <ScrollVelocity
              texts={[txt]}
              velocity={50}
              className="border-y-2 border-white p-3 sm:p-5 text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-none tracking-widest text-white"
            />
          </div>
        </div>
      </section>

      <div className="relative h-screen w-full overflow-hidden bg-[#0E0F13]">
        {cars.map((car, i) => (
          <div
            key={i}
            className={`absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
              index === i ? "scale-100 opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${car.image})`,
            }}
          ></div>
        ))}

        <div className="absolute inset-0 bg-linear-to-r from-[#08090C] via-[#08090C]/40 to-transparent"></div>

        <div className="relative z-10 flex h-full items-center px-8 md:px-16 lg:px-24">
          <div key={index} className="max-w-2xl">
            <RevealText
              as="h3"
              className="font-sans text-[clamp(1.75rem,7vw,3rem)] font-black uppercase text-[#F5F4F1] md:text-7xl lg:text-8xl"
            >
              {cars[index].name}
            </RevealText>

            <RevealText
              as="p"
              delay="200ms"
              className="mt-6 text-sm font-medium text-[#94A3B8] md:text-base"
            >
              {cars[index].description}
            </RevealText>

            <div className="mt-10">
              <Link
                to={"/cars"}
                className="group inline-flex h-12 items-center gap-2 rounded-sm border-2 border-white bg-[#F5F4F1] px-8 text-[16px] font-bold tracking-widest text-black shadow-xl transition-colors duration-300 hover:bg-transparent hover:text-white"
              >
                Browse Cars
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 z-20 flex gap-2 md:left-16 lg:left-24">
          {cars.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-0.75 cursor-pointer transition-all duration-500 ease-out ${
                index === i
                  ? "w-12 bg-white"
                  : "w-4 bg-white/20 hover:bg-white/40"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;