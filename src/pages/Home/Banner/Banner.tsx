import TitleSubTitle from "@/components/layout/Shared/TitleSubTitle";
import { Link } from "react-router";
const CoverImage =
  "https://res.cloudinary.com/dta2gcxsl/image/upload/v1757132773/eduCover_pkrlhe.jpg";
const Banner = () => {
  return (
    <>
      <div className="bg-violet-50 dark:bg-violet-900">
        <section className="relative w-[95%] mx-auto h-screen">
          {/* Background Image */}
          <img
            src={CoverImage}
            alt="EduCare Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 dark:bg-black/60 rounded"></div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <TitleSubTitle
              title="Welcome to EduCare"
              subtitle="Empowering you with the best courses and learning experience
              online. Join thousands of learners today."
            />

            <Link
              to="/courses"
              className="bg-violet-700 hover:bg-violet-800 dark:bg-violet-200 dark:hover:bg-violet-300 text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
            >
              Explore Courses
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Banner;
