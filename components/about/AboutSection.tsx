'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/projects';

const HIGHLIGHTS = [
  {
    label: 'AI / 计算机视觉',
    value: 'AICSS 二维图像空间重建 · Grounding DINO · SAM2 · Depth Anything V2',
  },
  {
    label: '影像 / 导演',
    value: '时间折叠(反乌托邦短片) · 推剪下的老街时光(纪录) · Seedance 2.0 / DaVinci',
  },
  {
    label: '全栈 / 系统',
    value: 'LIMS 实验室信息管理 · .NET 8 · Vue 3 · EF Core · SQLite',
  },
  {
    label: '游戏 / AR / 移动',
    value: 'UE5 城市冒险 · Unity + Vuforia AR 阅读 · AniFocus Android 学习打卡',
  },
];

export default function AboutSection() {
  const total = projects.length;
  const live = projects.filter((p) => p.status === 'complete').length;
  const inProgress = projects.filter((p) => p.status === 'in-progress').length;

  return (
    <section id="about" className="relative px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber" />
          <span>005 · ABOUT</span>
          <span className="h-px flex-1 bg-line" />
          <span>{`// OPERATOR PROFILE · 0${total} PROJECTS`}</span>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-5xl font-bold leading-tight tracking-tightest md:text-7xl">
              在<span className="gradient-text">视觉大模型</span>与<span className="gradient-text">影像</span>之间来回切换
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-fg/85">
              我是做
              <span className="bg-amber/15 px-1.5 py-0.5 text-amber"> AI / 计算机视觉</span>、
              <span className="bg-amber/15 px-1.5 py-0.5 text-amber">全栈</span>、
              游戏与影像的独立工程师。最近两年在
              <span className="bg-amber/15 px-1.5 py-0.5 text-amber"> AICSS</span>、
              UE5 城市冒险、AR 增强阅读、纪录短片几个方向之间来回切换,擅长把视觉与工程拼到一起,做成可点击可演示的真实系统。
            </p>

            <p className="mt-4 text-lg leading-relaxed text-fg/85">
              <span className="bg-amber/15 px-1.5 py-0.5 font-semibold text-amber">
                当前可立即入职 · 全职优先
              </span>
              。喜欢和重视工程纪律的团队一起,把产品从 0 到 1 做扎实。
            </p>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-line/60 bg-card/50 p-4"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{h.label}</div>
                  <div className="mt-1 text-sm text-fg/90">{h.value}</div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square w-full max-w-sm justify-self-end overflow-hidden rounded-3xl border border-line/60 bg-card/50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/covers/avatar.jpg" alt="铅笔素描猫头像" className="h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/30 to-black/70" />
            <div className="absolute bottom-5 left-5 right-5 font-mono text-[11px] uppercase tracking-widest text-cyan/80">
              ID · SHOWROOM_OPERATOR
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
