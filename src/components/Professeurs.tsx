"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import type { Professeur } from "@/lib/content";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProfesseursProps {
  professeurs: Professeur[];
  titre?: string;
}

export default function Professeurs({ professeurs, titre }: ProfesseursProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (professeurs.length === 0) {
    return null;
  }

  return (
    <section id="prof" className="py-20 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl text-[#F5F5F0] text-center mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {titre || "Les professeurs"}
        </h2>

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
          className="profs-swiper"
        >
          {professeurs.filter(p => p.image).map((prof) => (
            <SwiperSlide key={prof.slug}>
              <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#E11D48]/20 card-broadway">
                <div className="aspect-square overflow-hidden img-red-filter">
                  <Image
                    src={prof.image}
                    alt={prof.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3
                    className="text-xl text-[#F5F5F0] mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {prof.title}
                  </h3>
                  <p className="text-[#E11D48] text-sm uppercase tracking-wide">
                    {prof.fonction}
                  </p>

                  <div className="mt-4">
                    <button
                      onClick={() =>
                        setExpanded(expanded === prof.slug ? null : prof.slug)
                      }
                      className="text-[#E11D48] hover:text-[#FB7185] text-sm transition-colors"
                    >
                      {expanded === prof.slug
                        ? "Masquer la biographie −"
                        : "Lire la biographie +"}
                    </button>
                    {expanded === prof.slug && (
                      <div className="mt-4 text-left text-[#F5F5F0]/70 text-sm prose-broadway">
                        <div dangerouslySetInnerHTML={{ __html: prof.body }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
