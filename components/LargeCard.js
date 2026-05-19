import React from "react";
import Image from "next/image";

function LargeCard({ img, title, description, buttonText }) {
  return (
    <section className="relative py-16 cursor-pointer">
      <div className="relative h-96 min-w-[300px] overflow-hidden rounded-2xl">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        {/* Dark gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent rounded-2xl" />
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-12">
        <h3 className="text-4xl font-bold text-white mb-3 w-64 leading-tight drop-shadow-lg">
          {title}
        </h3>
        <p className="text-white/90 drop-shadow">{description}</p>
        <button
          className="mt-5 bg-white text-gray-900 text-sm font-semibold px-6 py-3 rounded-full
                           hover:bg-rose-500 hover:text-white shadow-lg
                           active:scale-95 transition-all duration-200"
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
}

export default LargeCard;
