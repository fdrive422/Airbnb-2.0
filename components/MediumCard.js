import Image from "next/image";
import React from "react";

function MediumCard({ img, title }) {
  return (
    <div className="cursor-pointer hover:scale-105 transform transition duration-300 ease-out group">
      <div className="relative h-80 w-80 overflow-hidden rounded-xl">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:brightness-90 transition-all duration-300"
          sizes="320px"
        />
      </div>
      <h3 className="text-2xl mt-3 font-semibold dark:text-white">{title}</h3>
    </div>
  );
}

export default MediumCard;
