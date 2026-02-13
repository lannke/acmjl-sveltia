"use client";

import { useState } from "react";
import type { Atelier, Lieu } from "@/lib/content";

interface AteliersProps {
  ateliers: Atelier[];
  lieux: Lieu[];
}

export default function Ateliers({ ateliers, lieux }: AteliersProps) {
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState<string | null>(null);

  const getLieuName = (slug: string) => {
    const lieu = lieux.find((l) => l.slug === slug);
    return lieu ? lieu.title : slug;
  };

  return (
    <section id="inscription" className="py-20 bg-[#1a1a1a]/50">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl text-[#FAF9F6] text-center mb-12"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Sélectionnez l&apos;atelier qui vous correspond
        </h2>

        {/* Location filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 text-sm font-medium transition-colors rounded-sm ${
              filter === "all"
                ? "bg-[#CCA054] text-[#0a0a0a]"
                : "border border-[#CCA054]/50 text-[#CCA054] hover:bg-[#CCA054]/10"
            }`}
          >
            Tous les lieux
          </button>
          {lieux.map((lieu) => (
            <button
              key={lieu.slug}
              onClick={() => setFilter(lieu.slug)}
              className={`px-5 py-2 text-sm font-medium transition-colors rounded-sm ${
                filter === lieu.slug
                  ? "bg-[#CCA054] text-[#0a0a0a]"
                  : "border border-[#CCA054]/50 text-[#CCA054] hover:bg-[#CCA054]/10"
              }`}
            >
              {lieu.title}
            </button>
          ))}
        </div>

        {/* Ateliers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ateliers
            .filter((a) => filter === "all" || a.lieu === filter)
            .map((atelier) => (
              <div
                key={atelier.slug}
                className="bg-[#0a0a0a] rounded-lg border border-[#CCA054]/20 p-6 text-center card-broadway"
              >
                {atelier.badge && (
                  <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase bg-[#CCA054] text-[#0a0a0a] rounded">
                    {atelier.badge}
                  </span>
                )}
                <h3
                  className="text-xl text-[#FAF9F6] mb-2"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {atelier.title}
                </h3>
                <p className="text-[#CCA054] text-sm mb-4">{atelier.prix}</p>

                <button
                  onClick={() => setOpenModal(atelier.slug)}
                  className="btn-broadway px-6 py-2 bg-[#CCA054] text-[#0a0a0a] font-medium rounded-sm hover:bg-[#E8C882] transition-colors"
                >
                  Détails
                </button>

                {/* Modal */}
                {openModal === atelier.slug && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => setOpenModal(null)}
                  >
                    <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm" />
                    <div
                      className="relative bg-[#1a1a1a] border border-[#CCA054]/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#CCA054]/20 p-4 flex justify-between items-center">
                        <div>
                          <h3
                            className="text-2xl text-[#FAF9F6]"
                            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                          >
                            {atelier.title}
                          </h3>
                          {atelier.badge && (
                            <span className="text-[#CCA054] text-sm">
                              {atelier.badge}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => setOpenModal(null)}
                          className="text-[#FAF9F6]/70 hover:text-[#FAF9F6]"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="p-6">
                        {atelier.spectacle && (
                          <p className="text-[#CCA054] text-center uppercase tracking-wide mb-6">
                            Spectacle : {atelier.spectacle}
                          </p>
                        )}

                        <div className="text-center mb-8">
                          <p className="text-3xl text-[#FAF9F6] font-bold mb-4">
                            {atelier.prix}
                          </p>
                          <a
                            href="https://sprw.io/stt-125f02"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-broadway inline-flex items-center px-8 py-3 bg-[#CCA054] text-[#0a0a0a] font-semibold rounded-sm hover:bg-[#E8C882] transition-colors"
                          >
                            Inscription
                            <svg
                              className="w-5 h-5 ml-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                              />
                            </svg>
                          </a>
                        </div>

                        <div className="divider-broadway mb-8" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            {/* Horaires */}
                            <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#CCA054]/10">
                              <svg
                                className="w-8 h-8 text-[#CCA054] mx-auto mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <p className="text-[#FAF9F6]/80 text-center text-sm">
                                {atelier.horaires}
                              </p>
                            </div>

                            {/* Période */}
                            <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#CCA054]/10">
                              <svg
                                className="w-8 h-8 text-[#CCA054] mx-auto mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <p className="text-[#FAF9F6]/80 text-center text-sm">
                                {atelier.periode}
                              </p>
                            </div>

                            {/* Lieu */}
                            <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#CCA054]/10">
                              <svg
                                className="w-8 h-8 text-[#CCA054] mx-auto mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <p className="text-[#FAF9F6]/80 text-center text-sm">
                                {getLieuName(atelier.lieu)}
                              </p>
                            </div>

                            {/* Contenu */}
                            {atelier.contenu && atelier.contenu.length > 0 && (
                              <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#CCA054]/10">
                                <h4 className="text-[#CCA054] text-sm uppercase mb-2 text-center">
                                  Contenu
                                </h4>
                                <ul className="text-[#FAF9F6]/80 text-sm space-y-1">
                                  {atelier.contenu.map((item, i) => (
                                    <li key={i} className="text-center">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            {/* Inclus */}
                            {atelier.inclus && atelier.inclus.length > 0 && (
                              <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#CCA054]/10">
                                <h4 className="text-[#CCA054] text-sm uppercase mb-2">
                                  Inclus
                                </h4>
                                <ul className="text-[#FAF9F6]/80 text-sm space-y-1">
                                  {atelier.inclus.map((item, i) => (
                                    <li key={i}>• {item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Conditions */}
                            {atelier.conditions &&
                              atelier.conditions.length > 0 && (
                                <div className="bg-[#0a0a0a]/50 rounded-lg p-4 border border-[#CCA054]/10">
                                  <h4 className="text-[#CCA054] text-sm uppercase mb-2">
                                    Conditions
                                  </h4>
                                  <ul className="text-[#FAF9F6]/80 text-sm space-y-1">
                                    {atelier.conditions.map((item, i) => (
                                      <li key={i}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                            {/* Description */}
                            {atelier.body && (
                              <div className="prose-broadway text-sm">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: atelier.body,
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
