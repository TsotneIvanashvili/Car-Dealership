const HeroSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <iframe
        src="https://player.cloudinary.com/embed/?cloud_name=dgccp9uvu&public_id=13718948-hd_1920_1080_60fps_aayte6&profile=cld-looping"
        className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-125 pointer-events-none border-0"
        allow="autoplay; fullscreen"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0B0F0E]/70" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
        <h1
          className="text-[#E7F2EE] uppercase leading-[0.82] tracking-[-0.04em] text-[5rem] md:text-[8rem] lg:text-[11rem] max-w-[1200px]"
          style={{ fontFamily: "Bebas Neue, serif" }}
        >
          POWER.
          <br />
          PRESTIGE.
          <br />
          PERFECTION.
        </h1>

        <p className="mt-6 max-w-xl text-[#A0AEA8] text-lg">
          Discover luxury vehicles engineered for performance, elegance, and
          control.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-[#00C46A] text-[#0B0F0E] px-6 py-3 rounded-md font-medium hover:bg-[#00E07A] transition duration-300">
            Explore Cars
          </button>

          <button className="border border-[#00C46A] text-[#00C46A] px-6 py-3 rounded-md font-medium hover:bg-[#00C46A]/10 transition duration-300">
            View Deals
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;