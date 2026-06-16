const HeroSection = () => {
  const CLD = "https://res.cloudinary.com/dgccp9uvu/video/upload";
  const PUBLIC_ID = "13718948-hd_1920_1080_60fps_aayte6";

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0E0F13] border-none">
      <video
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        poster={`${CLD}/so_0,f_auto,q_auto/${PUBLIC_ID}.jpg`}
        aria-hidden="true"
      >
        <source src={`${CLD}/f_webm,q_auto/${PUBLIC_ID}.webm`} type="video/webm" />
      </video>


      <div className="absolute inset-0 bg-linear-to-r from-[#0E0F13] via-[#0E0F13]/60 to-[#0E0F13]/15" />
      <div className="absolute inset-0 bg-linear-to-t from-[#010619] via-transparent to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">

        <h1
          className="text-[#F5F4F1] uppercase leading-[0.85] tracking-[-0.03em] text-[4rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[8rem] max-w-4xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          POWER.
          <br />
          PRESTIGE.
          <br />
          PERFECTION.
        </h1>

        <p className="mt-6 max-w-xl text-[#94A3B8] text-sm md:text-base tracking-wide font-medium">
          Discover luxury vehicles engineered for performance, elegance, and
          control.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-[#F5F4F1] text-black text-xs font-bold tracking-widest uppercase px-8 h-12 rounded-sm hover:bg-transparent border-2 border-white hover:text-white transition-colors duration-300 cursor-pointer shadow-lg shadow-black/40">
            Explore Cars
          </button>

        
        </div>
      </div>
    </section>
  );
};

export default HeroSection;