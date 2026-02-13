export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl text-[#FAF9F6] text-center mb-16"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Contact
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <h3
              className="text-2xl text-[#CCA054] mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Formulaire de contact
            </h3>
            <a
              href="https://sprw.io/stt-125f02"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-broadway inline-flex items-center px-8 py-4 bg-[#CCA054] text-[#0a0a0a] font-semibold rounded-sm hover:bg-[#E8C882] transition-colors"
            >
              Accéder au formulaire
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-xl text-[#CCA054] mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Coordonnées
              </h3>
              <address className="not-italic text-[#FAF9F6]/80 leading-relaxed">
                <strong className="text-[#FAF9F6]">ACMJL</strong>
                <br />
                Jenny Lorant
                <br />
                Route du Village 20
                <br />
                1063 Boulens
              </address>
            </div>

            <div>
              <h3
                className="text-xl text-[#CCA054] mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Partenaires
              </h3>
              <div className="text-[#FAF9F6]/80 space-y-3 text-sm">
                <p>
                  <strong className="text-[#FAF9F6]">Direction technique</strong>
                  <br />
                  Fabien Ayer
                </p>
                <p>
                  <strong className="text-[#FAF9F6]">Lumières</strong>
                  <br />
                  Armand Pochon
                </p>
                <p>
                  <strong className="text-[#FAF9F6]">Décors</strong>
                  <br />
                  Claude Salsac et Christine Stein
                </p>
                <p>
                  <strong className="text-[#FAF9F6]">Lieu</strong>
                  <br />
                  Salle des Remparts
                  <br />
                  Rue du Casino 30
                  <br />
                  1673 Rue
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
