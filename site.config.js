const CONFIG = {
  // profile setting (required)
  profile: {
    name: "草记",
    image: "/avatar.svg", // If you want to create your own notion avatar, check out https://notion-avatar.vercel.app
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

  // CONFIG configration (required)
  link: "https://puer.ink",
  since: 2024, // If leave this empty, current year will be used.
  lang: "zh-CN", // ['en-US', 'zh-CN', 'zh-HK', 'zh-TW', 'ja-JP', 'es-ES', 'ko-KR']
  ogImageGenerateURL: "https://og-image-korean.vercel.app", // The link to generate OG image, don't end with a slash

  // notion configuration (required)
  notionConfig: {
    pageId: process.env.NOTION_PAGE_ID,
  },

  // plugin configuration (optional)
  googleAnalytics: {
    enable: false,
    config: {
      measurementId: process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID || "",
    },
  },
  googleSearchConsole: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
    },
  },
  naverSearchAdvisor: {
    enable: false,
    config: {
      siteVerification: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    },
  },
  utterances: {
    enable: true,
    config: {
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO || "",
      "issue-term": "og:title",
      label: "💬 Utterances",
    },
  },
  giscus: {
    enable: true, // 启用 Giscus 评论
    config: {
      repo: "zhayabin/puerink", // 替换为你的 GitHub 仓库
      repoId: "R_kgDOM1ZZJA",          // 替换为仓库的 repoId
      category: "Announcements",       // 替换为你选择的分类
      categoryId: "DIC_kwDOM1ZZJM4Cir-s",   // 替换为分类的 categoryId
      mapping: "pathname",             // 评论关联方式，比如 'pathname', 'url', 'title' 等
      strict: "0",
      emitMetadata: "0",               // 是否启用元数据发送
      theme: "preferred_color_scheme", // 设置评论的主题（light 或 dark）
      lang: "zh-CN",                   // 设置语言
      crossorigin: "anonymous",        // 设置跨域请求
    },
  },
  isProd: process.env.VERCEL_ENV === "production", // distinguish between development and production environment (ref: https://vercel.com/docs/environment-variables#system-environment-variables)
  revalidateTime: 21600, // revalidate time for [slug], index
}

module.exports = { CONFIG }
