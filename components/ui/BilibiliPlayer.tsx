'use client';

interface BilibiliPlayerProps {
  src: string;
  className?: string;
}

export default function BilibiliPlayer({ src, className = '' }: BilibiliPlayerProps) {
  // 处理完整的嵌入URL或直接是BV号
  const embedSrc = src.includes('player.bilibili.com')
    ? src
    : `https://player.bilibili.com/player.html?isOutside=true&${src}`;

  return (
    <iframe
      src={embedSrc}
      className={className}
      allowFullScreen
      allow="autoplay; fullscreen"
      scrolling="no"
      frameBorder="0"
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
    />
  );
}
