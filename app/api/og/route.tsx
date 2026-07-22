import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  const title = '数字交互展厅';
  const subtitle = 'Digital Interactive Showroom';
  const tagline = 'Three.js 粒子 · 3D 雷达 · 终端模拟器 · 霓虹流水线';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'linear-gradient(135deg, #08080A 0%, #0d0d12 50%, #050509 100%)',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            color: '#22d3ee',
            fontSize: 22,
            letterSpacing: 6,
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#22d3ee',
              boxShadow: '0 0 24px #22d3ee',
            }}
          />
          SHOWROOM · 2026
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: '#ffffff',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: 1,
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 24,
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(255,255,255,0.4)',
            fontSize: 20,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          <div>Built with Next.js · R3F · GSAP</div>
          <div style={{ color: '#22d3ee' }}>→ DIGITAL · INTERACTIVE</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
