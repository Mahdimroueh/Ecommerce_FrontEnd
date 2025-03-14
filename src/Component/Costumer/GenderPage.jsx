import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const GenderPage = ({ video, pictures }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Auto-play prevented:", err));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Hero Video Section */}
      <div className="relative mb-16 overflow-hidden rounded-lg shadow-xl">
        <video
          ref={videoRef}
          className="w-full h-auto object-cover"
          loop
          muted
          playsInline
        >
          <source src={video} type="video/webm" />
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              New Collection
            </h2>
            <p className="text-lg md:text-xl opacity-90">
              Discover the latest trends
            </p>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {pictures.map((item) => (
          <motion.div
            key={item.id}
            className="group cursor-pointer"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-hidden rounded-lg shadow-md">
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="font-bold text-lg tracking-wide">{item.title}</h3>
              <p className="text-gray-600 mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GenderPage;
