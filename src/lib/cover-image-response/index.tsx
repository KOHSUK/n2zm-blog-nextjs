import { ImageResponse as NextImageResponse } from 'next/og';
import 'server-only';

type Props = {
  id: string;
  title: string;
};

export const size = {
  width: 1200,
  height: 630,
};

const GradientColorList = [
  // Warm color gradient
  '#FFE4E1, #FFDAB9, #FFC0CB',
  '#FFF0F5, #FAEBD7, #FFE4B5',
  '#FFDEAD, #FFE4E1, #FFF5EE',
  '#FFFACD, #FFF8DC, #FFEBCD',
  '#FFDAB9, #FFEFDB, #FFEBCD',
  // Cold color gradient
  '#E0FFFF, #E6E6FA, #F0F8FF',
  '#F0FFF0, #F0FFFF, #F5FFFA',
  '#E6E6FA, #E0FFFF, #F0E68C',
  '#ADD8E6, #B0E0E6, #AFEEEE',
  '#B0E0E6, #E0FFFF, #E6E6FA',
];

function getGradientColor(input: string): string {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input.charCodeAt(i);
  }

  return GradientColorList[sum % 10];
}

export default function CoverImageResponse({ id, title }: Props) {
  return new NextImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          background: `linear-gradient(45deg, ${getGradientColor(id)})`,
          padding: 48,
          display: 'flex',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            width: '100%',
            height: '100%',
            display: 'flex',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
