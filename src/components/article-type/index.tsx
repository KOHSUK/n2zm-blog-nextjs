type Props = {
  type: string;
  className?: string;
}

export default function ArticleType({ type, className }: Props) {
  return (
    <div className={`rounded-full bg-sky-500 text-white px-3 ${className ?? ''}`}>{type}</div>
  );
}
