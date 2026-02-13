import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Video from "@/components/Video";
import Presentation from "@/components/Presentation";
import Gallery from "@/components/Gallery";
import Ateliers from "@/components/Ateliers";
import Eleves from "@/components/Eleves";
import Events from "@/components/Events";
import Professeurs from "@/components/Professeurs";
import JennyBio from "@/components/JennyBio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import {
  getHomeContent,
  getProfesseurs,
  getAteliers,
  getEvents,
  getEleves,
  getLieux,
} from "@/lib/content";

export default async function Home() {
  const home = await getHomeContent();
  const professeurs = await getProfesseurs();
  const ateliers = await getAteliers();
  const events = await getEvents();
  const eleves = await getEleves();
  const lieux = await getLieux();

  return (
    <>
      <Navigation />
      <Hero headline={home.headline} heroImage={home.hero_image} />
      <BackToTop />
      <Stats />
      <Video video={home.video} />
      <Presentation body={home.body} quote={home.quote} />
      <Gallery images={home.gallery} />
      <Ateliers ateliers={ateliers} lieux={lieux} />
      <Eleves eleves={eleves} headline={home.eleves_headline} />
      <Events
        futureEvents={events.future}
        pastEvents={events.past}
        ateliers={ateliers}
      />
      <Professeurs professeurs={professeurs} />
      <JennyBio imageBio={home.image_bio} bodyBio={home.body_bio} />
      <Contact />
      <Footer />
    </>
  );
}
