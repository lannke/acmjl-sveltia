import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

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
  image?: string;
  tarifs?: {
    avs?: string;
    enfants_plus_6?: string;
    enfants_moins_6?: string;
    adultes?: string;
  };
  reservations?: string;
  status: 'a_venir' | 'passe';
  body: string;
}

export interface Eleve {
  slug: string;
  title: string;
  image: string;
  credit?: string;
  body: string;
}

export interface Lieu {
  slug: string;
  title: string;
  adresse: string;
}

export async function getHomeContent(): Promise<HomeContent> {
  const filePath = path.join(contentDirectory, 'pages', 'home.md');

  if (!fs.existsSync(filePath)) {
    return {
      title: 'ACMJL',
      headline: 'Ateliers de Comédie Musicale Jenny Lorant',
      hero_image: '/images/hero.jpg',
      quote: 'La vie est une aventure, ose-la.',
      body: '',
      body_bio: '',
      image_bio: '/images/jenny.jpg',
      gallery: [],
      eleves_headline: 'Ils sont passés par l\'ACMJL',
    };
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title || 'ACMJL',
    headline: data.headline || '',
    hero_image: data.hero_image || '/images/hero.jpg',
    video: data.video,
    quote: data.quote || '',
    body: content,
    body_bio: data.body_bio || '',
    image_bio: data.image_bio || '/images/jenny.jpg',
    gallery: data.gallery || [],
    eleves_headline: data.eleves_headline || 'Ils sont passés par l\'ACMJL',
    stats: data.stats,
  };
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
        image: data.image || '',
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
        image: data.image,
        tarifs: data.tarifs,
        reservations: data.reservations,
        status: data.status || 'passe',
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
        image: data.image || '',
        credit: data.credit,
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
