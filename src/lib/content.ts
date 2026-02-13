import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface HomeContent {
  title: string;
  headline: string;
  hero_image: string;
  video?: string;
  quote: string;
  body: string;
  body_bio: string;
  image_bio: string;
}

export interface Professeur {
  slug: string;
  title: string;
  headline: string;
  image: string;
  body: string;
}

export interface Atelier {
  slug: string;
  title: string;
  headline: string;
  numero: number;
  prix: number;
  category: string;
  frequence: string;
  periode: string;
  horaire: string;
  lieu: string;
  lieu_detail: string;
  date_spectacle: string;
  body: string;
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
        headline: data.headline || '',
        image: data.image || '/images/placeholder.jpg',
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
        headline: data.headline || '',
        numero: data.numero || 0,
        prix: data.prix || 0,
        category: data.category || '',
        frequence: data.frequence || '',
        periode: data.periode || '',
        horaire: data.horaire || '',
        lieu: data.lieu || '',
        lieu_detail: data.lieu_detail || '',
        date_spectacle: data.date_spectacle || '',
        body: content,
      };
    })
    .sort((a, b) => a.numero - b.numero);

  return ateliers;
}
