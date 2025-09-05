import { Link } from "react-router";
const CoverImage =
  "https://res.cloudinary.com/dta2gcxsl/image/upload/v1756836732/github-header-banner_ktmuvo.png";
const Home = () => {
  return (
    <>
      <section className="relative w-full h-screen">
        {/* Background Image */}
        <img
          src={CoverImage}
          alt="EduCare Banner"
          className="absolute inset-0 w-full h-full object-fill"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center md:items-start text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to EduCare
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-xl">
            Empowering you with the best courses and learning experience online.
            Join thousands of learners today.
          </p>
          <Link
            to="/courses"
            className="bg-violet-700 hover:bg-violet-800 dark:bg-violet-200 dark:hover:bg-violet-300 text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
          >
            Explore Courses
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
