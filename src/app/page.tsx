import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Video from "@/components/Video";
import Presentation from "@/components/Presentation";
import Quote from "@/components/Quote";
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
  getSections,
  getProfesseurs,
  getAteliers,
  getEvents,
  getEleves,
  getLieux,
} from "@/lib/content";

export default async function Home() {
  const sections = await getSections();
  const professeurs = await getProfesseurs();
  const ateliers = await getAteliers();
  const events = await getEvents();
  const eleves = await getEleves();
  const lieux = await getLieux();

  return (
    <>
      <Navigation />
      <Hero
        headline={sections.accueil.accroche}
        heroImage={sections.accueil.image_hero}
      />
      <BackToTop />
      <Stats stats={sections.stats} />
      <Video video={sections.video.video_embed} titre={sections.video.titre} />
      <Presentation
        titre={sections.presentation.titre}
        body={sections.presentation.body}
      />
      <Quote texte={sections.citation.texte} auteur={sections.citation.auteur} />
      <Gallery images={sections.galerie.images} titre={sections.galerie.titre} />
      <Ateliers
        ateliers={ateliers}
        lieux={lieux}
        titre={sections.ateliers.titre}
      />
      <Eleves eleves={eleves} headline={sections.anciens_eleves.titre} />
      <Events
        futureEvents={events.future}
        pastEvents={events.past}
        ateliers={ateliers}
        titre={sections.spectacles.titre}
      />
      <Professeurs professeurs={professeurs} titre={sections.professeurs.titre} />
      <JennyBio
        titre={sections.jenny_lorant.titre}
        sousTitre={sections.jenny_lorant.sous_titre}
        imageBio={sections.jenny_lorant.image}
        bodyBio={sections.jenny_lorant.body}
      />
      <Contact />
      <Footer footer={sections.pied_de_page} />
    </>
  );
}
