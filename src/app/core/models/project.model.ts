export interface Project {
  id: number;
  title: string;
  technologies: string[];
  description: string;
  features: string[];
  image?: string;
  slug: string;
  category?: string;
}
