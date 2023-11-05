type Props = {
  topic: string;
  className?: string;
};
export default function Topic({ topic, className }: Props) {
  return (
    <div
      className={`rounded bg-gray-200 text-gray-400 px-1 sm:text-base text-sm sm:h-6 h-5 ${className}`}
    >
      {topic}
    </div>
  );
}
