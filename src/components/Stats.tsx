export default function Stats() {
  const stats = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#CCA054]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "+150 élèves",
      description: "Depuis 2016, nos ateliers ont accompagné 150 élèves.",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#CCA054]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Made in Romandie",
      description: "Fondée en Suisse Romande dans le Canton de Vaud",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#CCA054]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "15 ans d'expérience",
      description: "Jenny Lorant possède plus de 15 ans d'expérience dans les comédies musicales",
    },
  ];

  return (
    <section id="start" className="py-20 bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#CCA054]/10 flex items-center justify-center group-hover:bg-[#CCA054]/20 transition-colors">
                {stat.icon}
              </div>
              <h2 className="text-3xl text-[#CCA054] mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {stat.title}
              </h2>
              <p className="text-[#FAF9F6]/70">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
