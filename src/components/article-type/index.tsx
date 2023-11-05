type Props = {
  type: string;
  className?: string;
};

export default function ArticleType({ type, className }: Props) {
  return (
    <div
      className={`rounded-full bg-sky-500 text-white px-3 sm:text-base text-sm sm:h-6 h-5 align-middle ${
        className ?? ''
      }`}
    >
      {type}
    </div>
  );
}
