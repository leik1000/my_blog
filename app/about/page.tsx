import { siteConfig } from '@/lib/config';

export const metadata = {
  title: '关于 - ' + siteConfig.name,
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">关于我</h1>

      <div className="prose dark:prose-invert max-w-none">
        <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">个人简介</h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            欢迎来到我的个人博客！这是我分享技术知识、项目经验和创意想法的地方。
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">技能</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>全栈开发（前端、后端、数据库）</li>
            <li>AI 模型集成与应用</li>
            <li>云服务部署与优化</li>
            <li>开源项目贡献</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">联系方式</h2>
          <div className="space-y-2">
            <p><strong>邮箱：</strong> contact@example.com</p>
            <p><strong>GitHub：</strong> <a href="#" className="text-blue-600 hover:underline">github.com/username</a></p>
            <p><strong>Twitter：</strong> <a href="#" className="text-blue-600 hover:underline">@username</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
