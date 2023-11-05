'use client';

import { useEffect } from 'react';

export default function ZennEmbedElements() {
  useEffect(() => {
    import('zenn-embed-elements');
  }, []);

  return null;
}
