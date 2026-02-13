interface QuoteProps {
  quote: string;
}

export default function Quote({ quote }: QuoteProps) {
  if (!quote) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-[#CCA054]/20 via-[#CCA054]/10 to-[#CCA054]/20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <svg
          className="w-12 h-12 text-[#CCA054] mx-auto mb-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p
          className="text-2xl md:text-3xl text-[#FAF9F6] italic"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {quote}
        </p>
      </div>
    </section>
  );
}
