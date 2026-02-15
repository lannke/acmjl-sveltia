import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');
const sectionsDirectory = path.join(contentDirectory, 'sections');

// Normalize image path: convert public/uploads/ to /uploads/ for frontend
function normalizeImagePath(imagePath: string): string {
  if (!imagePath) return '';
  return imagePath.replace(/^public\/uploads\//, '/uploads/');
}

// Convert plain text with line breaks to HTML paragraphs
function textToHtml(text: string): string {
  if (!text) return '';
  return text
    .split(/\n\n+/)
    .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

// Format date for display
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-CH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format multiple dates for display
function formatDates(dates: string[]): string {
  if (!dates || dates.length === 0) return '';
  if (dates.length === 1) return formatDate(dates[0]);
  return dates.map(d => formatDate(d)).join(' / ');
}

// Helper to read a section file
function readSection(filename: string): { data: Record<string, unknown>; content: string } {
  const filePath = path.join(sectionsDirectory, filename);
  if (!fs.existsSync(filePath)) {
    return { data: {}, content: '' };
  }
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return matter(fileContents);
}

// Section interfaces
export interface AccueilSection {
  titre: string;
  accroche: string;
  image_hero: string;
}

export interface StatsSection {
  eleves: string;
  eleves_desc: string;
  region: string;
  region_desc: string;
  experience: string;
  experience_desc: string;
  unique: string;
}

export interface VideoSection {
  titre: string;
  video_embed: string;
}

export interface PresentationSection {
  titre: string;
  body: string;
}

export interface CitationSection {
  texte: string;
  auteur?: string;
}

export interface GalerieSection {
  titre: string;
  images: string[];
}

export interface AteliersSection {
  titre: string;
  sous_titre?: string;
}

export interface AnciensElevesSection {
  titre: string;
  sous_titre?: string;
}

export interface SpectaclesSection {
  titre: string;
  sous_titre?: string;
}

export interface ProfesseursSection {
  titre: string;
  sous_titre?: string;
}

export interface JennyLorantSection {
  titre: string;
  sous_titre: string;
  image: string;
  body: string;
}

export interface PiedDePageSection {
  email: string;
  telephone?: string;
  adresse?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  copyright: string;
}

export interface AllSections {
  accueil: AccueilSection;
  stats: StatsSection;
  video: VideoSection;
  presentation: PresentationSection;
  citation: CitationSection;
  galerie: GalerieSection;
  ateliers: AteliersSection;
  anciens_eleves: AnciensElevesSection;
  spectacles: SpectaclesSection;
  professeurs: ProfesseursSection;
  jenny_lorant: JennyLorantSection;
  pied_de_page: PiedDePageSection;
}

// Get all sections
export async function getSections(): Promise<AllSections> {
  const accueil = readSection('01-accueil.md');
  const stats = readSection('02-stats.md');
  const video = readSection('03-video.md');
  const presentation = readSection('04-presentation.md');
  const citation = readSection('05-citation.md');
  const galerie = readSection('06-galerie.md');
  const ateliersSection = readSection('07-ateliers.md');
  const anciensEleves = readSection('08-anciens-eleves.md');
  const spectacles = readSection('09-spectacles.md');
  const professeursSection = readSection('10-professeurs.md');
  const jennyLorant = readSection('11-jenny-lorant.md');
  const piedDePage = readSection('12-pied-de-page.md');

  return {
    accueil: {
      titre: accueil.data.titre as string || 'ACMJL',
      accroche: accueil.data.accroche as string || '',
      image_hero: normalizeImagePath(accueil.data.image_hero as string) || '/images/hero.jpg',
    },
    stats: {
      eleves: stats.data.eleves as string || '',
      eleves_desc: stats.data.eleves_desc as string || '',
      region: stats.data.region as string || '',
      region_desc: stats.data.region_desc as string || '',
      experience: stats.data.experience as string || '',
      experience_desc: stats.data.experience_desc as string || '',
      unique: stats.data.unique as string || '',
    },
    video: {
      titre: video.data.titre as string || "L'ACMJL en vidéo",
      video_embed: video.data.video_embed as string || '',
    },
    presentation: {
      titre: presentation.data.titre as string || '',
      body: presentation.content || '',
    },
    citation: {
      texte: citation.data.texte as string || '',
      auteur: citation.data.auteur as string,
    },
    galerie: {
      titre: galerie.data.titre as string || 'Galerie photos',
      images: ((galerie.data.images as string[]) || []).map(normalizeImagePath),
    },
    ateliers: {
      titre: ateliersSection.data.titre as string || 'Nos ateliers',
      sous_titre: ateliersSection.data.sous_titre as string,
    },
    anciens_eleves: {
      titre: anciensEleves.data.titre as string || "Ils sont passés par l'ACMJL",
      sous_titre: anciensEleves.data.sous_titre as string,
    },
    spectacles: {
      titre: spectacles.data.titre as string || 'Dates des prochains spectacles',
      sous_titre: spectacles.data.sous_titre as string,
    },
    professeurs: {
      titre: professeursSection.data.titre as string || 'Les professeurs',
      sous_titre: professeursSection.data.sous_titre as string,
    },
    jenny_lorant: {
      titre: jennyLorant.data.titre as string || 'Jenny Lorant',
      sous_titre: jennyLorant.data.sous_titre as string || "Fondatrice de l'ACMJL",
      image: normalizeImagePath(jennyLorant.data.image as string) || '/images/jenny.jpg',
      body: textToHtml(jennyLorant.content || ''),
    },
    pied_de_page: {
      email: piedDePage.data.email as string || 'contact@jenny-musique.ch',
      telephone: piedDePage.data.telephone as string,
      adresse: piedDePage.data.adresse as string,
      facebook: piedDePage.data.facebook as string,
      instagram: piedDePage.data.instagram as string,
      youtube: piedDePage.data.youtube as string,
      copyright: piedDePage.data.copyright as string || '2025 ACMJL - Tous droits réservés',
    },
  };
}

// Legacy interface for backwards compatibility
export interface Stats {
  eleves: string;
  eleves_desc: string;
  region: string;
  region_desc: string;
  experience: string;
  experience_desc: string;
  unique: string;
}

export interface HomeContent {
  title: string;
  headline: string;
  hero_image: string;
  video?: string;
  quote: string;
  body: string;
  body_bio: string;
  image_bio: string;
  gallery: string[];
  eleves_headline: string;
  stats?: Stats;
}

// Legacy function - now reads from sections
export async function getHomeContent(): Promise<HomeContent> {
  const sections = await getSections();

  return {
    title: sections.accueil.titre,
    headline: sections.accueil.accroche,
    hero_image: sections.accueil.image_hero,
    video: sections.video.video_embed,
    quote: sections.citation.texte,
    body: sections.presentation.body,
    body_bio: sections.jenny_lorant.body,
    image_bio: sections.jenny_lorant.image,
    gallery: sections.galerie.images,
    eleves_headline: sections.anciens_eleves.titre,
    stats: sections.stats,
  };
}

export interface Professeur {
  slug: string;
  title: string;
  fonction: string;
  image: string;
  body: string;
}

export interface Atelier {
  slug: string;
  title: string;
  badge?: string;
  prix: string;
  horaires: string;
  periode: string;
  lieu: string;
  contenu: string[];
  spectacle?: string;
  inclus?: string[];
  conditions?: string[];
  status: 'open' | 'complet' | 'closed';
  body: string;
}

export interface Event {
  slug: string;
  title: string;
  groupe: string;
  dates: string[];
  date_display: string;
  image?: string;
  tarifs?: {
    avs?: string;
    enfants_plus_6?: string;
    enfants_moins_6?: string;
    adultes?: string;
  };
  reservations?: string;
  status: 'a_venir' | 'passe';
  ateliers?: string[];
  body: string;
}

export interface Eleve {
  slug: string;
  title: string;
  image: string;
  credit?: string;
  website?: string;
  body: string;
}

export interface Lieu {
  slug: string;
  title: string;
  adresse: string;
}

export async function getProfesseurs(): Promise<Professeur[]> {
  const profsDirectory = path.join(contentDirectory, 'professeurs');

  if (!fs.existsSync(profsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(profsDirectory);

  const professeurs = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(profsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || '',
        fonction: data.fonction || '',
        image: normalizeImagePath(data.image) || '',
        body: content,
      };
    });

  return professeurs;
}

export async function getAteliers(): Promise<Atelier[]> {
  const ateliersDirectory = path.join(contentDirectory, 'ateliers');

  if (!fs.existsSync(ateliersDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(ateliersDirectory);

  const ateliers = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(ateliersDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || '',
        badge: data.badge,
        prix: data.prix || '',
        horaires: data.horaires || '',
        periode: data.periode || '',
        lieu: data.lieu || '',
        contenu: data.contenu || [],
        spectacle: data.spectacle,
        inclus: data.inclus,
        conditions: data.conditions,
        status: data.status || 'open',
        body: content,
      };
    });

  return ateliers;
}

export async function getEvents(): Promise<{ future: Event[]; past: Event[] }> {
  const eventsDirectory = path.join(contentDirectory, 'events');

  if (!fs.existsSync(eventsDirectory)) {
    return { future: [], past: [] };
  }

  const filenames = fs.readdirSync(eventsDirectory);

  const events = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(eventsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || '',
        groupe: data.groupe || '',
        dates: data.dates || [],
        date_display: formatDates(data.dates || []),
        image: normalizeImagePath(data.image),
        tarifs: data.tarifs,
        reservations: data.reservations,
        status: data.status || 'passe',
        ateliers: data.ateliers,
        body: content,
      };
    });

  const future = events.filter(e => e.status === 'a_venir');
  const past = events.filter(e => e.status === 'passe');

  return { future, past };
}

export async function getEleves(): Promise<Eleve[]> {
  const elevesDirectory = path.join(contentDirectory, 'eleves');

  if (!fs.existsSync(elevesDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(elevesDirectory);

  const eleves = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(elevesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || '',
        image: normalizeImagePath(data.image) || '',
        credit: data.credit,
        website: data.website,
        body: content,
      };
    });

  return eleves;
}

export async function getLieux(): Promise<Lieu[]> {
  const lieuxDirectory = path.join(contentDirectory, 'lieux');

  if (!fs.existsSync(lieuxDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(lieuxDirectory);

  const lieux = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(lieuxDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || '',
        adresse: data.adresse || '',
      };
    });

  return lieux;
}
