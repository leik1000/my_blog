import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import path from 'path';

export const revalidate = 3600; // ISR

export async function generateStaticParams() {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  const projects = getAllPosts(projectsDir);
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  const project = getPostBySlug(params.slug, projectsDir);
  if (!project) return {};
  return {
    title: `${project.title} - 项目`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.cover ? [project.cover] : [],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  const project = getPostBySlug(params.slug, projectsDir);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {/* 面包屑 */}
      <nav className="mb-8 text-sm text-slate-600 dark:text-slate-400">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/projects" className="hover:text-blue-600">项目</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 dark:text-white">{project.title}</span>
      </nav>

      {/* 项目头 */}
      <header className="mb-8">
        {project.pinned && (
          <div className="inline-block mb-4 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs rounded-full">
            📌 置顶项目
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <time>{new Date(project.date).toLocaleDateString('zh-CN')}</time>
          <div className="flex gap-2">
            {project.tags.map(tag => (
              <Link key={tag} href={`/projects?tag=${tag}`} className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200">
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* 项目封面 */}
      {project.cover && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image src={project.cover} alt={project.title} width={800} height={400} className="w-full h-96 object-cover" />
        </div>
      )}

      {/* 项目内容 */}
      <article className="prose dark:prose-invert max-w-none">
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {project.content}
        </div>
      </article>

      {/* 返回导航 */}
      <nav className="mt-12 pt-8 border-t dark:border-slate-700">
        <Link href="/projects" className="text-blue-600 hover:underline">
          ← 返回项目列表
        </Link>
      </nav>
    </div>
  );
}
