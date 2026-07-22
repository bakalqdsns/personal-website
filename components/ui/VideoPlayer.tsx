'use client';

import { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  // 只在元数据加载完成后才播放,避免卡在第一帧
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setLoaded(false);

    const onCanPlay = () => setLoaded(true);

    video.addEventListener('canplay', onCanPlay);
    return () => video.removeEventListener('canplay', onCanPlay);
  }, [src]);

  // 元数据加载完自动播放(浏览器自动oplay政策)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loaded) return;
    video.play().catch(() => {
      // 自动播放被浏览器阻止时静默失败,用户手动点击即可
    });
  }, [loaded]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      controls
      preload="metadata"
      playsInline
      muted={false}
      className={`${className} ${!loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
    />
  );
}
