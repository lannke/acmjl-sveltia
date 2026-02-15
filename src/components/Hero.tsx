import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  headline: string;
  heroImage: string;
}

export default function Hero({ headline, heroImage }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center -mt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <Image
          src="https://res.cloudinary.com/dfv2us40f/image/upload/v1771164379/acmjl/logo_white.png"
          alt="ACMJL"
          width={160}
          height={160}
          className="mx-auto mb-8"
        />

        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-[#F5F5F0] mb-6 leading-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {headline}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            href="#start"
            className="btn-broadway inline-flex items-center justify-center px-8 py-4 bg-[#E11D48] text-[#F5F5F0] font-semibold rounded-sm hover:bg-[#FB7185] transition-colors"
          >
            Découvrir
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link
            href="#inscription"
            className="btn-broadway inline-flex items-center justify-center px-8 py-4 border-2 border-[#E11D48] text-[#E11D48] font-semibold rounded-sm hover:bg-[#E11D48] hover:text-[#F5F5F0] transition-colors"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-[#E11D48]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
