"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section id="galerie" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl text-[#FAF9F6] text-center mb-4"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Nos ateliers en images
        </h2>
        <p className="text-center text-[#CCA054] uppercase tracking-widest text-sm mb-12">
          Découvrez les images des derniers spectacles de nos élèves
        </p>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="gallery-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="aspect-square rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
