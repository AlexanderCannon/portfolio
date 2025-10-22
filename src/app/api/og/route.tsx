import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') ?? 'Alexander Cannon';
    const description = searchParams.get('description') ?? 'Portfolio and Blog';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#000',
            backgroundImage: 'linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#fff',
                marginBottom: '20px',
                lineHeight: '1.2',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: '#ccc',
                marginBottom: '40px',
                lineHeight: '1.4',
              }}
            >
              {description}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                color: '#888',
                fontSize: '18px',
              }}
            >
              <span>alexandercannon.dev</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
