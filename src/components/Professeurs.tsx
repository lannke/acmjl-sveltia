"use client";

import Image from "next/image";
import { useState } from "react";
import type { Professeur } from "@/lib/content";

interface ProfesseursProps {
  professeurs: Professeur[];
}

export default function Professeurs({ professeurs }: ProfesseursProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (professeurs.length === 0) {
    return null;
  }

  return (
    <section id="prof" className="py-20 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl text-[#FAF9F6] text-center mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Les professeurs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professeurs.map((prof, index) => (
            <div
              key={prof.slug}
              className="bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#CCA054]/20 card-broadway"
            >
              <div className="aspect-square overflow-hidden img-gold-filter relative">
                <Image
                  src={prof.image}
                  alt={prof.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3
                  className="text-xl text-[#FAF9F6] mb-1"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {prof.title}
                </h3>
                <p className="text-[#CCA054] text-sm uppercase tracking-wide">
                  {prof.headline}
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="text-[#CCA054] hover:text-[#E8C882] text-sm transition-colors"
                  >
                    {expandedIndex === index ? "Masquer la biographie −" : "Lire la biographie +"}
                  </button>
                  {expandedIndex === index && (
                    <div className="mt-4 text-left text-[#FAF9F6]/70 text-sm prose prose-sm prose-invert">
                      <div dangerouslySetInnerHTML={{ __html: prof.body }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
