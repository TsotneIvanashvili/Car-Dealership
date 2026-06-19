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
    <div>






      
      

      <section className="bg-[#07090e] px-6 py-28 text-white md:px-16 lg:px-24">

        <div className="mx-auto max-w-7xl">
          
          <div className="mb-12 text-center">
            
            <p className="text-sm font-black uppercase tracking-[0.35em] text-[#3157FF]">
              Global Network
            </p>

            <h2 className="mt-5 text-4xl font-black uppercase tracking-tight md:text-6xl">
              Worldwide Delivery
            </h2>
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
                  lat: 20.8566,
                  lng: 5.3522,
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
        <div className="mx-auto grid min-h-190 max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
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













    </div>
  );
};

export default About;
