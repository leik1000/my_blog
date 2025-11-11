import { getAllPosts } from '@/lib/mdx';
import path from 'path';
import { PostCard } from '@/components/PostCard';

export const revalidate = 3600;

export default function ProjectsPage() {
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  const projects = getAllPosts(projectsDir);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">项目列表</h1>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">暂无项目</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map(project => (
            <PostCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              summary={project.summary}
              date={project.date}
              tags={project.tags}
              cover={project.cover}
            />
          ))}
        </div>
      )}
    </div>
  );
}
