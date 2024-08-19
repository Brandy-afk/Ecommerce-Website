import React from "react";

interface ImageSectionProps {
  images: string[];
}

export default function GallarySection({ images }: ImageSectionProps) {
  return (
    <div className="h-40 w-full h-max">
      <div className="size-full grid w-full px-2 grid-cols-4 lg:grid-cols-8 lg:grid-rows-1 gap-2 p-2">
        {[...images, ...images].map((src, index) => (
          <div key={index} className="size-full overflow-hidden">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="object-contain size-full hover:scale-125 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
