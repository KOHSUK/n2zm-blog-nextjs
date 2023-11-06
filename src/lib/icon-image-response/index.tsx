import { ImageResponse as NextImageResponse } from 'next/og';
import 'server-only';

type Props = {
  emoji: string;
};

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function IconImageResponse({ emoji }: Props) {
  return new NextImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
        }}
      >
        {emoji}
      </div>
    ),
    {
      ...size,
    },
  );
}
