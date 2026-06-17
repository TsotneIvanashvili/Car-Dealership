import { Link } from "react-router-dom";
import GlitchText from "../components/GlitchText/GlitchText";
import PixelTrail from "../components/PixelTrail/PixelTrail";

const NotFound = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_70%_35%,rgba(30,76,140,0.22),transparent_35%),linear-gradient(to_bottom,rgba(3,7,18,0.35),rgba(3,7,18,1))]" />

      <div className="pointer-events-none absolute left-0 top-0 z-[2] h-full w-full bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[42px_42px]" />

      <div className="absolute inset-0 z-[3] opacity-35">
        <PixelTrail
          gridSize={60}
          trailSize={0.06}
          maxAge={280}
          interpolate={5}
          color="#1E4C8C"
          gooeyFilter={{
            id: "not-found-goo-filter",
            strength: 2,
          }}
        />
      </div>

      <section className="pointer-events-none relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div className="flex max-w-4xl flex-col items-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.5em] text-[#6F89B8]">
            Error 404
          </p>

          <GlitchText
            speed={0.75}
            enableShadows={true}
            enableOnHover={false}
            className="font-[Bebas_Neue]"
          >
            404
          </GlitchText>

          <h1 className="mt-8 text-4xl font-black uppercase tracking-[-0.04em] text-[#F5F4F1] md:text-6xl">
            Page Not Found!
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#9BA6B8] md:text-lg">
            The route you are looking for does not exist, or the car already
            left the garage.
          </p>

          <div className="pointer-events-auto relative z-20 mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/"
              className="rounded-sm border-2 border-[#F5F4F1] bg-[#F5F4F1] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-black shadow-xl transition duration-300 hover:bg-transparent hover:text-[#F5F4F1]"
            >
              Back Home
            </Link>

            <Link
              to="/products"
              className="rounded-sm border-2 border-white/25 bg-white/5 px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#F5F4F1] backdrop-blur-md transition duration-300 hover:border-[#F5F4F1] hover:bg-[#F5F4F1] hover:text-black"
            >
              View Cars
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFound;