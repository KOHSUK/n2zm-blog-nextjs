type Props = {
  type: string;
  className?: string;
  outlined?: boolean;
};

export default function ArticleType({
  type,
  className,
  outlined = false,
}: Props) {
  return (
    <div
      className={`rounded-full px-3 sm:text-base text-sm sm:h-6 h-5 align-middle ${
        outlined
          ? 'bg-white text-sky-500 border border-sky-500'
          : 'bg-sky-500 text-white'
      } ${className ?? ''}`}
    >
      {type}
    </div>
  );
}
