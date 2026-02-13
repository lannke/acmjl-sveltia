import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Presentation from "@/components/Presentation";
import Professeurs from "@/components/Professeurs";
import Footer from "@/components/Footer";
import { getHomeContent, getProfesseurs } from "@/lib/content";

export default async function Home() {
  const home = await getHomeContent();
  const professeurs = await getProfesseurs();

  return (
    <>
      <Navigation />
      <Hero
        headline={home.headline}
        heroImage={home.hero_image}
      />
      <Stats />
      <Presentation
        body={home.body}
        quote={home.quote}
      />
      <Professeurs professeurs={professeurs} />
      <Footer />
    </>
  );
}
