const CONFIG = {
  // profile setting (required)
  profile: {
    name: "草记",
    image: "/avatar.svg", // 自定义头像，详情请查看 https://notion-avatar.vercel.app
    role: "一个喜欢普洱茶的设计师",
    bio: "小小草民 / 闲聊杂记",
    email: "zhayabin@outlook.com",
    linkedin: "non",
    github: "zhayabin",
    instagram: "",
  },
  projects: [
    {
      name: `此站仓库 >`,
      href: "https://github.com/zhayabin/puerink",
    },
  ],
  // blog setting (required)
  blog: {
    title: "草记",
    description: "诗酒茶谈，闲聊杂记",
    scheme: "system", // 'light' | 'dark' | 'system'
  },

  // CONFIG configuration (required)
  link: "https://puer.ink",
  since: 2024, // 留空则使用当前年份
  lang: "zh-CN", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // 生成 OG 图片的链接，末尾不要带斜杠

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID, // 从环境变量获取 Notion 页面 ID
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "", // 从环境变量获取 Google Analytics 的测量 ID
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "", // 从环境变量获取 Google Search Console 的站点验证
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "", // 从环境变量获取 Naver 站点验证
    },
  },

  waline: {
    enable: true,
    serverURL: 'https://puerinkwaline.netlify.app/.netlify/functions/comment',
    comment: true,
  },

  isProd: process.env.VERCEL_ENV === "production", // 区分开发和生产环境 (参考: https://vercel.com/docs/environment-variables#system-environment-variables)
  // revalidateTime: 21600, // 如果不需要，可以删除或注释掉
}

module.exports = { CONFIG }
