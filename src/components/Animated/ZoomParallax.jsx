import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const imagePositions = [
  "h-[25vh] w-[45vw] sm:w-[25vw]",
  "-top-[30vh] left-[5vw] h-[30vh] w-[55vw] sm:w-[35vw]",
  "-top-[10vh] -left-[25vw] h-[45vh] w-[35vw] sm:w-[20vw]",
  "left-[27.5vw] h-[25vh] w-[40vw] sm:w-[25vw]",
  "top-[27.5vh] left-[5vw] h-[25vh] w-[40vw] sm:w-[20vw]",
  "top-[27.5vh] -left-[22.5vw] h-[25vh] w-[50vw] sm:w-[30vw]",
  "top-[22.5vh] left-[25vw] h-[15vh] w-[28vw] sm:w-[15vw]",
];

const ZoomParallax = ({ images = [] }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const finalImages = images.slice(0, 7);

  return (
    <section ref={container} className="relative h-[300vh] bg-[#07090e]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(7,9,14,0.75)_75%)]"></div>

        {finalImages.map((image, index) => {
          const scale = scales[index % scales.length];
          const positionClass = imagePositions[index] || imagePositions[0];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute inset-0 flex h-full w-full items-center justify-center"
            >
              <div
                className={`relative overflow-hidden rounded-[26px] border border-white/10 bg-[#101925] shadow-[0_25px_80px_rgba(0,0,0,0.45)] ${positionClass}`}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/5"></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ZoomParallax;