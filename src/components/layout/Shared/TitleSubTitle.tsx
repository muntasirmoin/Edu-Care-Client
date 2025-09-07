interface ITitleSubTitle {
  title: string;
  subtitle: string;
  className?: string; // optional for custom styling
}
const TitleSubTitle = ({ title, subtitle }: ITitleSubTitle) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-violet-700 dark:text-white mb-4">
          {title}
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-violet-700 dark:text-white/90 mb-6 max-w-xl">
          {subtitle}
        </h2>
      </div>
    </>
  );
};

export default TitleSubTitle;
