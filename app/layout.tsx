import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/scroll/SmoothScroll';
import CustomCursor from '@/components/cursor/CustomCursor';
import ScrollProgress from '@/components/scroll/ScrollProgress';
import ThemeToggle from '@/components/theme/ThemeToggle';
import FpsMeter from '@/components/perf/FpsMeter';
import Terminal from '@/components/terminal/Terminal';
import ContactFab from '@/components/contact/ContactFab';
import { ThemeScript } from '@/lib/theme';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: '数字媒体作品展厅 · Digital Interactive Showroom',
  description:
    '一个极客风格的交互式作品集。Three.js 粒子、3D 雷达图、终端模拟器、滚动驱动动画。展示全栈、Unity/AR、游戏与 AI 项目的真实工程能力。',
  keywords: ['作品集', 'Portfolio', 'Next.js', 'Three.js', '全栈', 'Unity', 'AR', 'AI'],
  authors: [{ name: 'Showroom Author' }],
  openGraph: {
    title: '数字媒体作品展厅',
    description: '操作一个轻量级创意工具界面的瞬间。',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#08080A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      data-theme="dark"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan focus:text-black focus:rounded"
        >
          跳到主要内容
        </a>
        <SmoothScroll />
        <CustomCursor />
        <ScrollProgress />
        <FpsMeter />
        <ThemeToggle />
        {children}
        <ContactFab />
        <Terminal />
      </body>
    </html>
  );
}