type NavigationItem = {
  label: string;
  href: string;
};

type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  siteTitle: "晓刀｜作品、思考与长期实验",
  author: "晓刀",
  hero: "借助 AI，把学习、投资、创作和生活经验，\n变成可以长期积累的作品。",
  heroSignature: "—— 晓刀",
  slogan: "发出信号，而不是等待被发现。",
  about: "晓刀，是我的笔名。\n我相信很多事情，只有真正做出来、放到世界上，\n才知道它有没有价值。\n这里记录我的学习、投资、创作与 AI 实践，\n也保存那些需要用时间慢慢回答的长期项目。",
  navigation: [
    { label: "首页", href: "/" },
    { label: "作品", href: "/works/" },
    { label: "思考", href: "/writing/" },
    { label: "实验", href: "/experiments/" },
    { label: "关于", href: "/about/" },
  ] satisfies NavigationItem[],
  contact: "联系方式待补充",
  defaultDescription: "晓刀的作品、思考与长期实验。",
  defaultOgImage: null,
  // 部署前替换为最终确认的 workers.dev 地址。
  siteUrl: "https://xiaodao.xiaodao-site.workers.dev",
  locale: "zh_CN",
  rss: {
    title: "晓刀｜作品、思考与长期实验",
    description: "晓刀的作品、思考与长期实验。",
    author: "晓刀",
  },
  socialLinks: [] satisfies SocialLink[],
} as const;
