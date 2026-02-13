"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import type { Eleve } from "@/lib/content";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ElevesProps {
  eleves: Eleve[];
  headline: string;
}

export default function Eleves({ eleves, headline }: ElevesProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (eleves.length === 0) return null;

  return (
    <section id="eleve" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl text-[#FAF9F6] text-center mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {headline}
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
          className="eleves-swiper"
        >
          {eleves.filter(e => e.image).map((eleve) => (
            <SwiperSlide key={eleve.slug}>
              <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#CCA054]/20 card-broadway">
                <div className="aspect-square overflow-hidden img-gold-filter">
                  <Image
                    src={eleve.image}
                    alt={eleve.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3
                    className="text-xl text-[#FAF9F6] mb-1"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {eleve.title}
                  </h3>

                  {eleve.website && (
                    <a
                      href={eleve.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#CCA054] hover:text-[#E8C882] text-sm transition-colors"
                    >
                      Site officiel →
                    </a>
                  )}

                  <div className="mt-4">
                    <button
                      onClick={() =>
                        setExpanded(
                          expanded === eleve.slug ? null : eleve.slug
                        )
                      }
                      className="text-[#CCA054] hover:text-[#E8C882] text-sm transition-colors"
                    >
                      {expanded === eleve.slug
                        ? "Masquer la biographie −"
                        : "Lire la biographie +"}
                    </button>
                    {expanded === eleve.slug && (
                      <div className="mt-4 text-left text-[#FAF9F6]/70 text-sm prose-broadway">
                        <div dangerouslySetInnerHTML={{ __html: eleve.body }} />
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
