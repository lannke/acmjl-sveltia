"use client";

interface VideoProps {
  video?: string;
}

export default function Video({ video }: VideoProps) {
  if (!video) return null;

  return (
    <section id="video" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2
          className="text-4xl text-[#FAF9F6] mb-8"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Découvrez l&apos;ACMJL en vidéo
        </h2>
        <div
          className="aspect-video rounded-lg overflow-hidden border border-[#CCA054]/30"
          dangerouslySetInnerHTML={{ __html: video }}
        />
      </div>
    </section>
  );
}
