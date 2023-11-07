// import NextImage from 'next/image';
import { getNotionClient, getUser } from '@/lib/notion';

type Props = {
  userId: string;
};

export default async function Author({ userId }: Props) {
  const notion = getNotionClient(process.env.NOTION_TOKEN);
  const user = await getUser(notion, userId);

  return (
    <div className="flex items-center">
      {/* <NextImage
        src={`/avatar/${user.id}`}
        alt={user.name || 'user'}
        className="rounded-full w-8 h-8 mr-2"
        height={32}
        width={32}
      /> */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/avatar/${user.id}`}
        alt={user.name || 'user'}
        className="rounded-full w-8 h-8 mr-2"
        height={32}
        width={32}
        style={{ objectFit: 'cover' }}
      />
      <span className="text-gray-700 hover:text-gray-900">{user.name}</span>
    </div>
  );
}
