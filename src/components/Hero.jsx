import { Link } from "react-router-dom";
import "./comp.css";

const HeroSection = () => {
  const CLD = "https://res.cloudinary.com/dgccp9uvu/video/upload";
  const PUBLIC_ID = "13718948-hd_1920_1080_60fps_aayte6";

  return (
    <section className="relative h-screen w-full overflow-hidden border-none bg-[#0E0F13]">
      <video
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        poster={`${CLD}/so_0,f_auto,q_auto/${PUBLIC_ID}.jpg`}
        aria-hidden="true"
      >
        <source
          src={`${CLD}/f_webm,q_auto/${PUBLIC_ID}.webm`}
          type="video/webm"
        />
      </video>

      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0e0f1398] via-[#0E0F13]/30 to-[#0E0F13]/15" />

      <div className="absolute inset-x-0 bottom-0 z-[2] h-[35vh] bg-gradient-to-t from-[#010619] via-[#010619cc] to-transparent pointer-events-none" />

      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
        <h1
          className="max-w-4xl text-[4rem] uppercase leading-[0.85] tracking-[-0.03em] text-[#F5F4F1] animate-[slideRight_1s_ease-out_forwards] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          POWER.
          <br />
          PRESTIGE.
          <br />
          PERFECTION.
        </h1>

        <p className="mt-6 max-w-xl text-sm font-medium tracking-wide text-[#94A3B8] opacity-0 animate-[slideRight_1s_ease-out_500ms_forwards] md:text-base">
          Discover luxury vehicles engineered for performance, elegance, and
          control.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            to="/cars"
            className="flex h-12 items-center justify-center rounded-sm border-2 border-white bg-[#F5F4F1] px-8 text-md font-bold uppercase tracking-widest text-black opacity-0 shadow-lg shadow-black/40 transition-colors duration-300 animate-[slideRight_1s_ease-out_700ms_forwards] hover:bg-transparent hover:text-white"
          >
            Explore Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;