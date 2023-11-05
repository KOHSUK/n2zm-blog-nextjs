import ZennEmbedElements from '@/components/zenn-embed-elements';
import { ZennEmbedScript } from '@/components/zenn-embed-script';

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <>
      <ZennEmbedScript />
      <ZennEmbedElements />
      {children}
    </>
  );
}
