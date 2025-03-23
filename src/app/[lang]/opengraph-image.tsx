import { ImageResponse } from 'next/og';
import type { Locale } from '../../dictionaries';

export const runtime = 'edge';

export const alt = 'Mollösunds Wärdshus';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  
  // Title based on language
  const title = lang === 'sv' 
    ? 'Välkommen till Mollösunds Wärdshus' 
    : 'Welcome to Mollösunds Wärdshus';
  
  // Subtitle based on language
  const subtitle = lang === 'sv'
    ? 'Upplev lyx vid havet'
    : 'Experience luxury by the sea';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #1a365d, #2c5282)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: 40,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 20,
          }}
        >
          Mollösunds Wärdshus
        </div>
        <div
          style={{
            fontSize: 48,
            marginBottom: 40,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 36,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

// We can't use generateStaticParams with edge runtime
