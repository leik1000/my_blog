import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  cover?: string;
  pinned?: boolean;
  content: string;
}

const postsDir = path.join(process.cwd(), 'content', 'posts');
const projectsDir = path.join(process.cwd(), 'content', 'projects');

export function getMDXFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter(file => file.endsWith('.mdx') || file.endsWith('.md'));
  } catch {
    return [];
  }
}

export function parseFrontmatter(fileContent: string): { frontmatter: any; content: string } {
  const { data, content } = matter(fileContent);
  return { frontmatter: data, content };
}

export function getPostBySlug(slug: string, dir: string = postsDir): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, '');
    const filePath = path.join(dir, `${realSlug}.mdx`);
    let content = fs.readFileSync(filePath, 'utf8');
    if (!fs.existsSync(filePath)) {
      const markdownPath = path.join(dir, `${realSlug}.md`);
      if (fs.existsSync(markdownPath)) {
        content = fs.readFileSync(markdownPath, 'utf8');
      } else {
        return null;
      }
    }
    const { frontmatter, content: body } = parseFrontmatter(content);
    return {
      slug: realSlug,
      title: frontmatter.title || realSlug,
      summary: frontmatter.summary || '',
      date: frontmatter.date || new Date().toISOString(),
      tags: frontmatter.tags || [],
      cover: frontmatter.cover,
      pinned: frontmatter.pinned || false,
      content: body,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(dir: string = postsDir): Post[] {
  const files = getMDXFiles(dir);
  const posts = files.map(file => getPostBySlug(file, dir)).filter((post): post is Post => post !== null);
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByTag(tag: string, dir: string = postsDir): Post[] {
  const posts = getAllPosts(dir);
  return posts.filter(post => post.tags.includes(tag));
}
