import Script from 'next/script';

export function ZennEmbedScript() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script src="https://embed.zenn.studio/js/listen-embed-event.js" strategy="afterInteractive" />
  );
}
