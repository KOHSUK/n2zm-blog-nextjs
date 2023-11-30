export default function ArticlesLoading() {
  return (
    <div className="xl:max-w-screen-xl md:max-w-screen-md mx-auto">
      <div className="animate-pulse grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 md:gap-x-12 gap-y-20 md:gap-y-24">
        {[...Array(6)].map((i) => (
          <div key={i}>
            <div className="bg-gray-200 dark:bg-gray-700 aspect-w-16 aspect-h-9 rounded overflow-hidden relative mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-20 h-4" />
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-full h-6 my-4" />
            <div className="flex items-center">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-8 w-8 mr-2" />
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-5 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
