"use client";

import { useEffect, useRef, useState } from "react";

interface VideoProps {
  video?: string;
  titre?: string;
}

export default function Video({ video, titre }: VideoProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && containerRef.current && video) {
      containerRef.current.innerHTML = video;
      // Load Instagram embed script
      if (video.includes('instagram')) {
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [mounted, video]);

  if (!video) return null;

  return (
    <section id="video" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2
          className="text-4xl text-[#F5F5F0] mb-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {titre || "Découvrez l'ACMJL en vidéo"}
        </h2>
        <div
          ref={containerRef}
          className="aspect-video rounded-lg overflow-hidden border border-[#E11D48]/30 flex items-center justify-center"
        >
          {!mounted && <span className="text-[#E11D48]">Chargement...</span>}
        </div>
      </div>
    </section>
  );
}
