import { Link } from "react-router-dom";
import CardSwap, { Card } from "../components/Animated/CardStack";
import WorldMap from "../components/WorldMap";

const cardHeaders = [
  {
    title: "Performance",
    icon: "fa-gauge-high",
  },
  {
    title: "Luxury",
    icon: "fa-gem",
  },
  {
    title: "Precision",
    icon: "fa-bullseye",
  },
];

const About = () => {
  return (
    <main className="overflow-hidden bg-[#07090e] text-white">
      <section className="relative min-h-screen overflow-hidden bg-[#07090e] px-6 pt-10 pb-10 md:px-16 lg:px-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 "></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 "></div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl flex-col justify-center">
          <div className="mb-10 flex items-center gap-5">
            <span className="h-px w-12 bg-[#3157FF]"></span>

            <p className="text-sm font-black uppercase tracking-[0.4em] text-[#3157FF]">
              About Aurex
            </p>
          </div>

          <h1 className="max-w-6xl text-[clamp(4rem,12vw,11rem)] font-black uppercase leading-[0.86] tracking-[-0.07em] text-[#F5F0E6]">
            Driven By <br />
            Obsession.
          </h1>

          <p className="mt-10 max-w-3xl text-lg font-semibold leading-9 text-[#B8C1D1] md:text-2xl">
            A curated dealership for those who refuse the ordinary. We hunt, vet
            and deliver the world's most exceptional machines — and stand behind
            every one.
          </p>
        </div>

      </section>

      <section className="bg-[#07090e] px-6 py-24 text-white md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.6fr]">
          <h2 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] text-[#F5F0E6] md:text-7xl">
            Our <br />
            Story
          </h2>

          <div className="max-w-4xl space-y-8 text-lg font-semibold leading-9 text-[#C3CEE2] md:text-2xl">
            <p>
              Aurex began in a single glass showroom with one belief: that
              owning a great car should feel as engineered as the car itself. No
              pressure, no theatrics — only the finest examples, presented
              honestly.
            </p>

            <p>
              Eighteen years on, we represent more than thirty marques across
              five cities, but the standard hasn't moved. Every vehicle is
              inspected, documented and prepared by people who genuinely love
              them.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#3157FF] px-6 py-20 text-white md:px-16 lg:px-24">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-6xl font-black tracking-tighter md:text-7xl">
              18
            </h3>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.35em] text-white/75 md:text-sm">
              Years Curating
            </p>
          </div>

          <div>
            <h3 className="text-6xl font-black tracking-tighter md:text-7xl">
              2,400+
            </h3>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.35em] text-white/75 md:text-sm">
              Cars Delivered
            </p>
          </div>

          <div>
            <h3 className="text-6xl font-black tracking-tighter md:text-7xl">
              30+
            </h3>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.35em] text-white/75 md:text-sm">
              Marques Represented
            </p>
          </div>

          <div>
            <h3 className="text-6xl font-black tracking-tighter md:text-7xl">
              5
            </h3>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.35em] text-white/75 md:text-sm">
              Global Showrooms
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#07090e] px-6 py-28 text-white md:px-16 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#3157FF]">
              Global Network
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase tracking-tight md:text-6xl">
              Worldwide Delivery
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#8EA6C9]">
              From Tbilisi to the world's biggest cities, we help premium cars
              reach their next owner with confidence.
            </p>
          </div>

          <WorldMap
            lineColor="#3157FF"
            dots={[
              {
                start: {
                  lat: 41.7151,
                  lng: 44.8271,
                  label: "Tbilisi",
                },
                end: {
                  lat: 51.5074,
                  lng: -0.1278,
                  label: "London",
                },
              },
              {
                start: {
                  lat: 41.7151,
                  lng: 44.8271,
                  label: "Tbilisi",
                },
                end: {
                  lat: 48.8566,
                  lng: 2.3522,
                  label: "Paris",
                },
              },
              {
                start: {
                  lat: 41.7151,
                  lng: 44.8271,
                  label: "Tbilisi",
                },
                end: {
                  lat: 25.2048,
                  lng: 55.2708,
                  label: "Dubai",
                },
              },
              {
                start: {
                  lat: 41.7151,
                  lng: 44.8271,
                  label: "Tbilisi",
                },
                end: {
                  lat: 40.7128,
                  lng: -74.006,
                  label: "New York",
                },
              },
            ]}
          />
        </div>
      </section>

      
<section className="relative h-175 overflow-hidden bg-[#050914] pt-20 text-white md:px-16 lg:px-24">
        <div className="mx-auto flex flex-col min-h-190 max-w-7xl gap-12 ">
          <div className="relative flex flex-col justify-start z-20">
            <h1 className="max-w-xl text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
              What Do We Offer?
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-[#A7B0AD]">
              We offer a carefully selected range of premium vehicles, built for
              drivers who want style, comfort, and performance in one place.
              From powerful sports cars to refined daily drives, every car is
              chosen to deliver quality, confidence, and a better driving
              experience.
            </p>

            <Link to={"/cars"} className="rounded-full border-2 border-white  px-8 py-4 font-semibold bg-white text-black w-fit mt-10 hover:text-white hover:bg-transparent transition">
              View Cars
            </Link>
          </div>

          <div className="relative mt-20 overflow-visible">
            <CardSwap
              width={790}
              height={700}
              cardDistance={50}
              verticalDistance={70}
              delay={3000}
              pauseOnHover={false}
              skewAmount={4}
              easing="elastic"
            >
              {cardHeaders.map((item, i) => (
                <Card
                  key={i}
                  className="overflow-hidden rounded-3xl border border-white/60 bg-[#090A10] shadow-2xl"
                >
                  <div className="flex h-16 items-center gap-4 border-b border-white/70 bg-black/70 px-7 backdrop-blur-md">
                    <i
                      className={`fa-solid ${item.icon} text-xl text-white/90`}
                    ></i>

                    <h4 className="text-2xl font-bold tracking-tight text-white/90">
                      {item.title}
                    </h4>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;