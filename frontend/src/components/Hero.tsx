import { useState, useEffect } from "react";
import vid from "../assets/vid.mp4";
import sweet1 from "../assets/sweet1.png";
import sweet2 from "../assets/sweet2.png";
import sweet3 from "../assets/sweet3.png";
import sweet4 from "../assets/sweet4.png";

const fullText = `Handcrafted with love using pure and natural ingredients.
Inspired by traditional recipes passed through generations.
Freshly prepared, hygienic, and made to perfection for every celebration.`;

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  /* Loader → Video switch */
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  /* Typing effect */
  useEffect(() => {
    if (!showVideo) return;

    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [index, showVideo]);

  return (
    <section className="h-screen w-full relative bg-amber-100 flex items-center justify-center">

      {/* ---------------------- LOADER ---------------------- */}
      {loading && (
        <div className="flex flex-col items-center select-none">
          <div className="flex gap-4 mb-4">
            <img src={sweet1} className="sweet-loader delay-1" />
            <img src={sweet2} className="sweet-loader delay-2" />
            <img src={sweet3} className="sweet-loader delay-3" />
            <img src={sweet4} className="sweet-loader delay-4" />
          </div>

          <p className="text-orange-700 text-lg font-semibold tracking-wide animate-pulse">
            Let the world be bitter, we stay sweet 🍯
          </p>
        </div>
      )}

      {/* ---------------------- VIDEO SECTION ---------------------- */}
      {showVideo && (
        <div className="absolute inset-0 w-full h-full z-40">
          <video
            autoPlay
            muted
            playsInline
            loop
            className="w-full h-full object-cover"
          >
            <source src={vid} />
          </video>

          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-black/40 backdrop-blur-lg px-5 py-4 rounded-xl max-w-lg text-center">
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-3">
                Welcome to Our Sweet World 🍬
              </h1>

              <p className="text-white text-sm md:text-base leading-relaxed whitespace-pre-line font-mono">
                {typedText}
                {index < fullText.length && (
                  <span className="typing-cursor">|</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- AFTER VIDEO ---------------------- */}
      {!loading && !showVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-orange-700">
            Sweet Section Coming… 🍭
          </h1>
        </div>
      )}
    </section>
  );
}
