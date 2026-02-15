"use client";

import { useState } from "react";
import Image from "next/image";

interface JennyBioProps {
  titre?: string;
  sousTitre?: string;
  imageBio: string;
  bodyBio: string;
}

export default function JennyBio({ titre, sousTitre, imageBio, bodyBio }: JennyBioProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="jennylorant" className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <Image
                src={imageBio}
                alt={titre || "Jenny Lorant"}
                width={500}
                height={625}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-[#E11D48] rounded-lg -z-10" />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <h2
              className="text-4xl md:text-5xl text-[#F5F5F0] mb-2"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {titre || "Jenny Lorant"}
            </h2>
            <p className="text-[#E11D48] uppercase tracking-widest text-sm mb-8">
              {sousTitre || "Fondatrice de l'ACMJL"}
            </p>

            {/* Mobile: collapsible */}
            <div className="lg:hidden">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[#E11D48] hover:text-[#FB7185] transition-colors mb-4"
              >
                {expanded
                  ? "Masquer la biographie −"
                  : "Lire la biographie +"}
              </button>
              {expanded && (
                <div className="prose-broadway text-[#F5F5F0]/80">
                  <div dangerouslySetInnerHTML={{ __html: bodyBio }} />
                </div>
              )}
            </div>

            {/* Desktop: always visible */}
            <div className="hidden lg:block prose-broadway text-[#F5F5F0]/80 text-lg">
              <div dangerouslySetInnerHTML={{ __html: bodyBio }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
