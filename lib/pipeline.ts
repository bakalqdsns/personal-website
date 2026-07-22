export type NodeStatus = 'done' | 'wip' | 'planned';

export interface PipelineNode {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  status: NodeStatus;
  detail: string;
}

export const pipeline: PipelineNode[] = [
  { id: 'survey', index: '01', title: '文献调研', subtitle: 'Survey', status: 'done', detail: '梳理生成式AI在动画制作领域的研究现状，明确技术空白与主攻方向，锁定核心模型选型。' },
  { id: 'deploy', index: '02', title: '基础模型部署测试', subtitle: 'Deploy', status: 'done', detail: 'GroundingDINO/SAM2/Depth-Anything-V2三模型本地部署与协同切割测试，验证联合处理可行性。' },
  { id: 'arch', index: '03', title: '系统总体设计', subtitle: 'Architecture', status: 'done', detail: '端到端系统架构设计，八大模块接口规范与标准化数据格式（JSON/PNG/FBX）一次定齐，完成剧本初稿。' },
  { id: 'storyboard', index: '04', title: '分镜生成模块', subtitle: 'Storyboard', status: 'wip', detail: '基于大语言模型实现故事文本到结构化分镜表的自动转换，Prompt模板与JSON Schema约束设计。' },
  { id: 'models', index: '05', title: 'AI模型独立测试', subtitle: 'Models', status: 'wip', detail: 'Z-Image/Seedance/VoxCPM模型本地部署、调用测试与性能评估，形成输出质量基准报告。' },
  { id: 'segment', index: '06', title: '分层分割与补全', subtitle: 'Segment', status: 'wip', detail: '三模型协同推理流程工程化，图层自动分割与扩散模型遮挡补全，实现单图到完整图层的全自动处理。' },
  { id: 'fbx', index: '07', title: '三维重建与FBX导出', subtitle: 'FBX', status: 'planned', detail: '补全图层按深度转换为带厚度三维面片，建立空间坐标关系，导出FBX模型文件。' },
  { id: 'character', index: '08', title: '人物资产模块', subtitle: 'Character', status: 'planned', detail: '角色三视图生成与动作PNG序列制作，绿幕抠像与角色库建立。' },
  { id: 'blender', index: '09', title: 'Blender插件开发', subtitle: 'Blender', status: 'planned', detail: '批量导入/材质光照/分层视差动画驱动/Cycles渲染调用，一键自动化搭建。' },
  { id: 'integrate', index: '10', title: '系统集成与联调', subtitle: 'Integrate', status: 'planned', detail: '串联全流程管线，端到端运行验证，消融实验与性能评估。' },
  { id: 'audio', index: '11', title: '音频合成与后期合成', subtitle: 'Audio', status: 'planned', detail: '情绪匹配配音生成，渲染片段剪辑调色与音画同步合成，输出完整系统验证案例。' },
];