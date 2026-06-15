
const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="../public/Main/13718948-hd_1920_1080_60fps.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-[#0B0F0E]/70"></div>

      <div
        style={{ fontFamily: "Space Grotesk" }}
        className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24"
      >
        <h1 className="text-[#E7F2EE] uppercase leading-[0.82] tracking-[-0.04em] text-[5rem] md:text-[8rem] lg:text-[11rem] max-w-300" style={{ fontFamily: "Bebas Neue, serif" }}>
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
          <button className="bg-[#00C46A] text-[#0B0F0E] px-6 py-3 rounded-md hover:bg-[#00E07A] transition">
            Explore Cars
          </button>

          <button className="border border-[#00C46A] text-[#00C46A] px-6 py-3 rounded-md hover:bg-[#00C46A]/10 transition">
            View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
