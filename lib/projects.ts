/**
 * Static project catalog. Each entry represents a fully-described work in the
 * grid. Media use SVG placeholders (0 KB) generated in /public/covers and
 * /public/media. Real assets can be dropped in later with the same names.
 */

export type ProjectStatus = 'complete' | 'in-progress' | 'planned';
export type ProjectType = 'fullstack' | 'ar' | 'game' | 'ai' | 'pipeline' | 'mobile' | 'film';

export interface ProjectMedia {
  type: 'image' | 'video';
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
  role: '独立开发' | '系统设计与核心开发' | '系统架构与后端开发' | '游戏系统开发' | '核心开发' | '导演' | '剪辑' | 'AI生成';
  stack: { name: string }[];
  status: ProjectStatus;
  size: 'lg' | 'md' | 'sm';
  year: string;
  cover: { type: 'image' | 'video'; src: string };
  media: ProjectMedia[];
  challenges: string[];
  links: { github?: string; demo?: string };
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
    challenges: [
      '单张图片深度估计与空间层级恢复',
      '目标检测、语义分割与图层自动生成',
      '二维内容向虚拟摄影空间转换',
    ],
    links: {
      github: 'https://github.com/bakalqdsns/AI-Cinematic-Spatial-System',
      demo: '#',
    },
    highlights: [
      'AI视觉理解 Pipeline',
      '自动生成空间层级',
      '纸雕动画虚拟摄影流程',
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
      { name: 'Seedance 2.0' },
    ],
    status: 'complete',
    size: 'lg',
    year: '2026',
    cover: { type: 'image', src: '/covers/time-fold.svg' },
    media: [
      {
        type: 'image',
        src: '/media/time-fold-1.jpg',
        alt: '时间折叠海报',
      },
      {
        type: 'image',
        src: '/media/time-fold-2.jpg',
        alt: 'AI场景重建',
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
    title: 'Urban Escape · UE5 城市冒险平台游戏',
    subtitle: 'Low-poly third-person adventure game',
    summary:
      '基于 Unreal Engine 5 开发的第一人称城市探索平台游戏，融合环境探索、敌人AI和交互机制。',
    type: 'game',
    role: '游戏系统开发',
    stack: [
      { name: 'Unreal Engine 5' },
      { name: 'Blueprint' },
      { name: 'AI Perception' },
      { name: 'Behavior Tree' },
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
      '敌人感知与行为逻辑',
      '第一人称控制系统',
      '关卡交互设计',
    ],
    links: {
      github: '#',
    },
    highlights: [
      'UE5开发流程',
      'AI敌人系统',
      'Low-poly场景设计',
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
      { name: 'MMD' },
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
      github: '#',
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
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}