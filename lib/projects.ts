/**
 * Static project catalog. Each entry represents a fully-described work in the
 * grid. Media use SVG placeholders (0 KB) generated in /public/covers and
 * /public/media. Real assets can be dropped in later with the same names.
 */

export type ProjectStatus = 'complete' | 'in-progress' | 'planned';
export type ProjectType = 'fullstack' | 'ar' | 'game' | 'ai' | 'pipeline' | 'mobile' | 'film';

export interface ProjectMedia {
  type: 'image' | 'video' | 'wistia' | 'bilibili';
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  index: string; // display number, e.g. "01"
  title: string;
  subtitle: string;
  summary: string;
  type: ProjectType;
  role: '独立开发' | '合作开发' | '系统设计与核心开发' | '系统架构与后端开发' | '游戏系统开发' | '核心开发' | '导演' | '剪辑' | 'AI生成';
  stack: { name: string }[];
  status: ProjectStatus;
  size: 'lg' | 'md' | 'sm';
  year: string;
  cover: { type: 'image' | 'video' | 'wistia' | 'bilibili'; src: string };
  media: ProjectMedia[];
  challenges: string[];
  links: { github?: string; demo?: string; baiduPan?: string };
  pipelineId?: string; // 关联 pipeline.ts 中的节点
  highlights: string[]; // bullet metrics
}

export const projects: Project[] = [
  {
    slug: 'aicss',
    index: '01',
    title: 'AICSS · AI Cinematic Spatial System',
    subtitle: 'AI-powered 2D image spatial reconstruction system',
    summary:
      '基于视觉大模型与深度学习技术，将二维图像自动解析为空间化场景，并结合纸雕风格渲染与虚拟摄影实现动态影像生成。',
    type: 'ai',
    role: '系统设计与核心开发',
    stack: [
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'PyTorch' },
      { name: 'Depth Anything V2' },
      { name: 'Grounding DINO' },
      { name: 'SAM2' },
      { name: 'Three.js' },
      { name: 'ComfyUI' },
    ],
    status: 'in-progress',
    size: 'lg',
    year: '2026',
    cover: { type: 'image', src: '/covers/aicss.svg' },
    media: [
      {
        type: 'image',
        src: '/media/aicss-1.jpg',
        alt: 'AI场景解析流程',
      },
      {
        type: 'image',
        src: '/media/aicss-2.jpg',
        alt: '纸雕空间化效果',
      },
    ],
    pipelineId: 'storyboard', // 关联到 pipeline.ts 中的分镜生成模块
    challenges: [
      '单张图片深度估计与空间层级恢复',
      '目标检测、语义分割与图层自动生成',
      '二维内容向虚拟摄影空间转换',
    ],
    links: {
      github: 'https://github.com/bakalqdsns/AI-Cinematic-Spatial-System',
    },
    highlights: [
      'AI视觉理解 Pipeline',
      '自动生成空间层级',
      '纸雕动画摄影流程',
    ],
  },


  {
    slug: 'time-fold',
    index: '02',
    title: '时间折叠 · Time Fold',
    subtitle: 'AI-generated dystopian short film · 2026',
    summary:
      '在这座城市里，时间并不是均匀流动的资源——它被划分、被分配、也被严格控制。有人拥有完整的二十四小时，有人只有十六小时，还有些人只剩下夜晚的八小时。泰瑞克曾经生活在第二层，直到某个再普通不过的一天，他的时间被收回了。没有警告，没有解释，他没有离开原来的世界，只是被时间抛弃了。',
    type: 'film',
    role: '导演',
    stack: [
      { name: 'AI视频生成' },
    ],
    status: 'complete',
    size: 'lg',
    year: '2026',
    cover: { type: 'image', src: '/covers/time-fold.svg' },
    media: [
      {
        type: 'bilibili',
        src: 'aid=116497263363985&bvid=BV13VRKBgEvC&cid=37997642632&p=1',
        alt: '视频描述',
      },
      {
        type: 'image',
        src: '/media/time-fold-1.jpg',
        alt: '时间折叠海报',
      },
      {
        type: 'image',
        src: '/media/time-fold-2.jpg',
        alt: '重点场景一览',
      },
    ],
    challenges: [
      '用 Seedance 2.0 构建完整反乌托邦世界观',
      '在无传统工作流条件下保持影像视觉风格统一',
      '将抽象的"时间分层"概念转化为可感知的画面',
    ],
    links: {
      demo: 'https://www.bilibili.com/video/BV13VRKBgEvC',
    },
    highlights: [
      '完整反乌托邦短片',
      '三层时间分配的社会隐喻',
      'Seedance 2.0 · 无工作流制作',
    ],
  },


  {
    slug: 'humanity-docs',
    index: '03',
    title: '推剪下的老街时光',
    subtitle: 'Documentary short film · 2025',
    summary:
      '以韶关武江桥底小巷的理发店为窗口，通过记录斑驳的理发工具、泛黄的老式座椅、店主浸染岁月痕迹的双手，编织出韶关老城绵延四十载的烟火图景。镜头穿梭于桥底潮湿的巷道、店主专注剃发的褶皱眼角、老顾客茶余饭后的闲谈碎语之间，捕捉推剪声里流淌的城市记忆。',
    type: 'film',
    role: '导演',
    stack: [
      { name: 'Sony A7III' },
      { name: 'DaVinci Resolve' },
    ],
    status: 'complete',
    size: 'md',
    year: '2025',
    cover: { type: 'image', src: '/covers/humanity-docs.svg' },
    media: [
      {
        type: 'image',
        src: '/media/humanity-docs-1.jpg',
        alt: '推剪下的老街时光剧照',
      },
      {
        type: 'image',
        src: '/media/humanity-docs-2.jpg',
        alt: '拍摄现场',
      },
    ],
    challenges: [
      '在狭窄潮湿的桥底巷道中完成画面构图',
      '如何让拍摄对象自然地习惯镜头存在',
      '用声音细节还原老街的市井氛围',
    ],
    links: {
      demo: 'https://www.bilibili.com/video/BV14rK86EECB',
    },
    highlights: [
      '全片 2 分 46 秒',
      '韶关老城 · 四十载烟火',
      '真实非虚构叙事',
    ],
  },


  {
    slug: 'lims',
    index: '04',
    title: 'LIMS · 实验室信息管理系统',
    subtitle: 'Full-stack laboratory information management system',
    summary:
      '面向实验室业务流程的信息化管理平台，实现实验数据管理、用户权限控制和业务流程数字化。',
    type: 'fullstack',
    role: '系统架构与后端开发',
    stack: [
      { name: '.NET 8' },
      { name: 'Vue 3' },
      { name: 'Entity Framework Core' },
      { name: 'SQLite' },
    ],
    status: 'complete',
    size: 'lg',
    year: '2025',
    cover: {
      type: 'image',
      src: '/covers/lims.svg',
    },
    media: [
      {
        type: 'image',
        src: '/media/lims-1.jpg',
        alt: 'LIMS系统界面',
      },
      {
        type: 'image',
        src: '/media/lims-2.jpg',
        alt: '数据管理模块',
      },
    ],
    challenges: [
      '复杂业务数据模型设计',
      '前后端接口架构设计',
      '数据库关系与权限管理',
    ],
    links: {
      github: 'https://github.com/bakalqdsns/lims-auth',
    },
    highlights: [
      '.NET 8 企业级架构',
      'Vue3 管理后台',
      '完整业务闭环',
    ],
  },


  {
    slug: 'ue-city-platform',
    index: '05',
    title: 'Urban Escape · UE5 城市逃生游戏',
    subtitle: 'UE5.7 first & third-person urban escape game',
    summary:
      '基于 Unreal Engine 5.7 开发的第一人称城市逃生游戏。玩家在充满挑战的城市环境中完成各种任务，通过对话系统体验完整剧情，同时享受自由探索与解谜互动的乐趣。',
    type: 'game',
    role: '游戏系统开发',
    stack: [
      { name: 'Unreal Engine 5.7' },
      { name: 'Blueprint' },
      { name: 'StateTree' },
      { name: 'AI Perception' },
    ],
    status: 'complete',
    size: 'lg',
    year: '2026',
    cover: {
      type: 'image',
      src: '/covers/ue-city.svg',
    },
    media: [],
    challenges: [
      'AI敌人感知与行为逻辑',
      '物体交互框架与解谜机制',
      '对话系统与剧情流程管理',
    ],
    links: {
      baiduPan: 'https://pan.baidu.com/s/1PQa06G7Bb6Xdz4qlVKxRwQ?pwd=bxzy',
    },
    highlights: [
      'UE5.7 开发',
      '多视角切换',
      'AI 敌人系统',
      'Low-poly 场景',
      '剧情对话系统',
    ],
  },


  {
    slug: 'ar-ebook',
    index: '06',
    title: 'AR E-Book · 增强现实数字阅读系统',
    subtitle: 'Interactive AR educational experience',
    summary:
      '利用 Unity AR 技术实现实体书籍与数字模型结合的交互式阅读体验。',
    type: 'ar',
    role: '核心开发',
    stack: [
      { name: 'Unity' },
      { name: 'C#' },
      { name: 'Vuforia' },
    ],
    status: 'complete',
    size: 'md',
    year: '2025',
    cover: {
      type: 'image',
      src: '/covers/arbook.svg',
    },
    media: [],
    challenges: [
      'AR识别与内容绑定',
      '移动端性能优化',
      '三维模型交互设计',
    ],
    links: {
      baiduPan: 'https://pan.baidu.com/s/1Kklv1eBkIVtHD0bjwDu5sQ?pwd=mz8n',
    },
    highlights: [
      'Unity AR开发',
      '数字内容融合',
      '移动端部署',
    ],
  },


  {
    slug: 'anifocus',
    index: '07',
    title: 'AniFocus · 二次元学习打卡应用',
    subtitle: 'Anime-style Android productivity app',
    summary:
      '结合任务管理、学习记录和动漫化UI设计的Android应用。',
    type: 'mobile',
    role: '独立开发',
    stack: [
      { name: 'Android' },
      { name: 'Java' },
      { name: 'Room' },
      { name: 'OkHttp' },
    ],
    status: 'complete',
    size: 'md',
    year: '2025',
    cover: {
      type: 'image',
      src: '/covers/anifocus.svg',
    },
    media: [],
    challenges: [
      '本地数据持久化',
      '任务状态管理',
      'Android组件开发',
    ],
    links: {
      github: 'https://github.com/bakalqdsns/app_homework',
    },
    highlights: [
      'Room数据库',
      '完整App流程',
      'UI设计实现',
    ],
  },


  {
    slug: 'love-remote',
    index: '08',
    title: '恋爱遥控器 · Love Remote',
    subtitle: 'Unity branching narrative game',
    summary:
      '一款以店长模拟为核心、C#与Lua混合开发的恋爱视觉小说游戏。玩家扮演店铺经营者，通过遥控器形态的UI与三位女主角互动，体验回合制剧情与好感度系统带来的沉浸式恋爱体验。',
    type: 'game',
    role: '合作开发',
    stack: [
      { name: 'Unity' },
      { name: 'C#' },
      { name: 'Lua' },
      { name: 'Live2D' },
    ],
    status: 'complete',
    size: 'lg',
    year: '2026',
    cover: {
      type: 'image',
      src: '/covers/love-remote.svg',
    },
    media: [
      {
        type: 'image',
        src: '/media/love-remote-1.jpg',
        alt: '恋爱遥控器游戏界面',
      },
      {
        type: 'image',
        src: '/media/love-remote-2.jpg',
        alt: '分支剧情系统',
      },
      {
        type: 'wistia',
        src: '2t5nyei9hf',
        alt: '视频描述',
      },
    ],
    challenges: [
      'C#底层框架与Lua业务逻辑的混合架构设计',
      '回合制剧情引擎与配表驱动系统',
      '遥控器形态UI的交互反馈实现',
      '角色好感度与多结局数据追踪',
    ],
    links: {
      baiduPan: 'https://pan.baidu.com/s/1qIu8KiRj1C-oUHq9JWCfsg?pwd=uenx',
    },
    highlights: [
      'C# + Lua 混合开发',
      '回合制剧情引擎',
      '好感度系统',
      '多结局分支',
      'Live2D 动态立绘',
    ],
  },


  {
    slug: 'img-translator',
    index: '09',
    title: '多模态图文引擎 · Multimodal Image-Text Engine',
    subtitle: 'Modular pipeline for image-text extraction, conversion & rendering',
    summary:
      '模块化图像文本处理引擎，支持 Image ↔ Text 双向转换。Detection → OCR → Translation → Rendering 四步完全解耦，可插拔替换。TextBlock JSON 作为标准中间表示，兼容 LLM/API 扩展。可用于漫画翻译、OCR 数据处理、图片文本重排。',
    type: 'ai',
    role: '合作开发',
    stack: [
      { name: 'Python' },
      { name: 'OpenCV' },
      { name: 'PIL' },
      { name: 'LLM API' },
      { name: 'React' },
    ],
    status: 'complete',
    size: 'md',
    year: '2026',
    cover: {
      type: 'image',
      src: '/covers/img-translator.svg',
    },
    media: [
      {
        type: 'image',
        src: '/covers/img-translator.svg',
        alt: '图像翻译界面',
      },
    ],
    challenges: [
      '模块化架构：Detection / OCR / Translation / Rendering 完全解耦',
      'TextBlock JSON 标准中间表示，实现任意子路径可插拔通信',
      'LLM 集成：上下文翻译、风格改写、剧情重构',
    ],
    links: {
      github: 'https://github.com/bakalqdsns/trans-img',
    },
    highlights: [
      'Image ↔ Text 双向转换',
      'TextBlock 标准中间格式',
      'LLM/API 可扩展',
      '漫画翻译 / OCR / 重排',
    ],
  },


  {
    slug: 'gd-martial-arts',
    index: '10',
    title: '武林绘卷 · Guangdong Martial Arts',
    subtitle: 'Data-driven visual narrative of Guangdong martial arts',
    summary:
      '将广东省 30 项武术非遗名录转译为五卷可滚动的"武林绘卷"。p5.js 粒子构字开场，GeoJSON 气泡图呈现地市分布，Chart.js 批次洞察，Canvas 时间轴追踪演进。墨 / 朱 / 金 / 米四色诠释宋韵美学，零依赖离线运行。',
    type: 'fullstack',
    role: '独立开发',
    stack: [
      { name: 'p5.js' },
      { name: 'Chart.js' },
      { name: 'GeoJSON' },
      { name: 'Python' },
    ],
    status: 'in-progress',
    size: 'md',
    year: '2026',
    cover: {
      type: 'image',
      src: '/covers/gd-martial-arts.svg',
    },
    media: [
      {
        type: 'image',
        src: '/covers/gd-martial-arts.svg',
        alt: '广东武术首页',
      },

    ],
    challenges: [
      'p5.js 粒子系统：1400 像素点采样，弹簧入场 + 鼠标排斥',
      'GeoJSON 气泡图：21 地市真实边界 + 三级回退加载',
      '五卷长轴叙事：翻页节奏与信息密度控制',
    ],
    links: {
      demo: 'https://bakalqdsns.github.io/guangdong-wushu-atlas/',
    },
    highlights: [
      '粒子可视化',
      '地理气泡图',
      '批次洞察',
      '宋韵 UI',
      '离线运行',
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}