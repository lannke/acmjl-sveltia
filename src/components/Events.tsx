"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import type { Event, Atelier } from "@/lib/content";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface EventsProps {
  futureEvents: Event[];
  pastEvents: Event[];
  ateliers: Atelier[];
  titre?: string;
}

export default function Events({
  futureEvents,
  pastEvents,
  ateliers,
  titre,
}: EventsProps) {
  const [tab, setTab] = useState<"future" | "past">("future");

  const getAtelierTitle = (slug: string) => {
    const atelier = ateliers.find((a) => a.slug === slug);
    return atelier?.title || slug;
  };

  return (
    <section id="concerts" className="py-20 bg-[#1a1a1a]/50">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl text-[#F5F5F0] text-center mb-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {titre || "Dates des prochains spectacles"}
        </h2>

        {/* Toggle buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setTab("future")}
            className={`px-6 py-2 font-medium transition-colors rounded-sm ${
              tab === "future"
                ? "bg-[#E11D48] text-[#F5F5F0]"
                : "border border-[#E11D48]/50 text-[#E11D48] hover:bg-[#E11D48]/10"
            }`}
          >
            À venir
          </button>
          <button
            onClick={() => setTab("past")}
            className={`px-6 py-2 font-medium transition-colors rounded-sm ${
              tab === "past"
                ? "bg-[#E11D48] text-[#F5F5F0]"
                : "border border-[#E11D48]/50 text-[#E11D48] hover:bg-[#E11D48]/10"
            }`}
          >
            Passés
          </button>
        </div>

        {/* Future events */}
        {tab === "future" && (
          <>
            {futureEvents.length === 0 ? (
              <p className="text-center text-[#F5F5F0]/70 py-8">
                Aucun nouveau spectacle prévu pour l&apos;instant.
              </p>
            ) : (
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
                className="events-swiper"
              >
                {futureEvents.map((event) => (
                  <SwiperSlide key={event.slug}>
                    <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#E11D48]/20 card-broadway">
                      <div className="aspect-video overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h3
                          className="text-xl text-[#F5F5F0] mb-2"
                          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                        >
                          {event.title}
                        </h3>
                        <p className="text-[#E11D48] text-sm uppercase tracking-wide mb-4">
                          {event.date_display}
                        </p>

                        {event.ateliers?.map((slug) => (
                          <span key={slug} className="badge-broadway">
                            {getAtelierTitle(slug)}
                          </span>
                        ))}

                        <div className="mt-6">
                          <p className="text-[#F5F5F0]/70 text-sm mb-2">
                            Réservations :
                          </p>
                          <a
                            href="mailto:billetterie@jenny-musique.ch"
                            className="text-[#E11D48] hover:text-[#FB7185] transition-colors"
                          >
                            billetterie@jenny-musique.ch
                          </a>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </>
        )}

        {/* Past events */}
        {tab === "past" && (
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
            className="past-events-swiper"
          >
            {pastEvents.map((event) => (
              <SwiperSlide key={event.slug}>
                <div className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#E11D48]/20 opacity-75">
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3
                      className="text-xl text-[#F5F5F0] mb-2"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-[#E11D48]/70 text-sm uppercase tracking-wide mb-4">
                      {event.date_display}
                    </p>
                    {event.ateliers?.map((slug) => (
                      <span key={slug} className="badge-broadway opacity-70">
                        {getAtelierTitle(slug)}
                      </span>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
