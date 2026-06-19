import { useEffect, useState } from "react";

const CLD = "https://res.cloudinary.com/dgccp9uvu/video/upload";
const PUBLIC_ID = "12085618_3840_2160_25fps_w6mc6u";

const POSTER = `${CLD}/so_0,f_auto,q_auto,w_1280/${PUBLIC_ID}.jpg`;
const VIDEO_WEBM = `${CLD}/f_webm,q_auto,w_1280/${PUBLIC_ID}.webm`;
const VIDEO_MP4 = `${CLD}/f_mp4,q_auto,w_1280/${PUBLIC_ID}.mp4`;

const DESKTOP_QUERY = "(min-width: 768px)";

const VideoBackground = () => {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(DESKTOP_QUERY).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  if (!isDesktop) {
    return (
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      autoPlay
      muted
      loop
      playsInline
      poster={POSTER}
      aria-hidden="true"
    >
      <source src={VIDEO_WEBM} type="video/webm" />
      <source src={VIDEO_MP4} type="video/mp4" />
    </video>
  );
};

export default VideoBackground;
