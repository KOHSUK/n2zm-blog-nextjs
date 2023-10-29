type Props = {
  topic: string;
  className?: string;
}
export default function Topic({ topic, className }: Props) {
  return (
    <div className={`rounded bg-gray-200 text-gray-400 px-1 ${className}`}>{topic}</div>
  )
}