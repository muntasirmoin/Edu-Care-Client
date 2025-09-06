interface ITitleSubTitle {
  title: string;
  subtitle: string;
  className?: string; // optional for custom styling
}
const TitleSubTitle = ({ title, subtitle, className }: ITitleSubTitle) => {
  return (
    <>
      <div className={className}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-xl">
          {subtitle}
        </p>
      </div>
    </>
  );
};

export default TitleSubTitle;
