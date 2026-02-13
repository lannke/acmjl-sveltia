interface PresentationProps {
  body: string;
  quote: string;
}

export default function Presentation({ body, quote }: PresentationProps) {
  return (
    <>
      <section id="presentation" className="py-20 bg-[#1a1a1a]/50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl text-[#FAF9F6] mb-12" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            <span className="text-gradient-gold">Unique</span> en Suisse Romande
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-8 bg-[#0a0a0a]/50 rounded-lg border border-[#CCA054]/20 card-broadway">
              <svg className="w-12 h-12 text-[#CCA054] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg text-[#FAF9F6]/90 font-light">
                Le monde de la comédie musicale vous a toujours attiré mais vous n&apos;avez jamais osé franchir le pas ?
              </p>
            </div>
            <div className="p-8 bg-[#0a0a0a]/50 rounded-lg border border-[#CCA054]/20 card-broadway">
              <svg className="w-12 h-12 text-[#CCA054] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <p className="text-lg text-[#FAF9F6]/90 font-light">
                Vous êtes danseur(se), chanteur(se) ou comédien(ne) et vous désirez approfondir l&apos;art de la comédie musicale ?
              </p>
            </div>
          </div>

          {body && (
            <div className="prose prose-lg prose-invert mx-auto text-[#FAF9F6]/80" dangerouslySetInnerHTML={{ __html: body }} />
          )}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-gradient-to-r from-[#CCA054]/20 via-[#CCA054]/10 to-[#CCA054]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <svg className="w-12 h-12 text-[#CCA054] mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-2xl md:text-3xl text-[#FAF9F6] italic" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {quote}
          </p>
        </div>
      </section>
    </>
  );
}
