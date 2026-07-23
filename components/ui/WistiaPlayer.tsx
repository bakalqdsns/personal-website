'use client';

import { useEffect, useRef } from 'react';

interface WistiaPlayerProps {
  videoId: string;
  className?: string;
  playerColor?: string; // 十六进制颜色，如 '#00e6cc'
}

export default function WistiaPlayer({
  videoId,
  className = '',
  playerColor = '00f0ff',
}: WistiaPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.getElementById('wistia-player-js')) {
      const script = document.createElement('script');
      script.id = 'wistia-player-js';
      script.src = 'https://fast.wistia.com/player.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      <wistia-player
        media-id={videoId}
        aspect="1.7777777777777777"
        player-color={playerColor}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
