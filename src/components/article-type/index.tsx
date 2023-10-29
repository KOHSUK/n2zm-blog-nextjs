type Props = {
  type: string;
}

export default function ArticleType({ type }: Props) {
  return (
    <div className="rounded-full bg-sky-500 text-white px-3">{type}</div>
  )
}