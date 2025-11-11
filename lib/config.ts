export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'My Blog',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.leik1000.xyz',
  description: '个人博客 - 分享项目与技术文章',
  author: '博主',
  socials: {
    github: 'https://github.com/leik1000/my_blog',
    twitter: '',
  },
  nav: [
    { label: '首页', href: '/' },
    { label: '文章', href: '/posts' },
    { label: '项目', href: '/projects' },
    { label: '工具', href: '/tools/image' },
    { label: '关于', href: '/about' },
  ],
};
