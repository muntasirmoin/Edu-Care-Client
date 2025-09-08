import TitleSubTitle from "@/components/layout/Shared/TitleSubTitle";
import { Link } from "react-router";

const NewCourseBanner = () => {
  return (
    <section className="bg-violet-50 dark:bg-violet-900 text-gray-900 dark:text-white py-4">
      <TitleSubTitle title="Learn Something New This Month" subtitle="" />
      <div className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-12 lg:px-12">
        {/* Left Text Section */}
        <div className="md:w-1/2 space-y-6 text-left">
          <h2 className="text-3xl md:text-5xl text-violet-700 dark:text-white font-extrabold leading-tight">
            Upgrade Your Skills Today
          </h2>
          <p className="text-md md:text-lg text-violet-700 dark:text-white">
            Explore our latest courses and boost your skills this month. Learn
            from experts and stay ahead in your career with curated content and
            hands-on guidance. Discover the latest courses curated by experts.
            Learn new skills, gain knowledge, and take your career to the next
            level.
          </p>
          <Link
            to="/courses"
            className="bg-violet-700 hover:bg-violet-800 dark:bg-violet-200 dark:hover:bg-violet-300 text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
          >
            Explore Courses
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-end">
          <img
            src="https://res.cloudinary.com/dta2gcxsl/image/upload/v1757320244/online-education-coursifyme_pva8wa.jpg"
            alt="New Courses"
            className="w-full max-w-md md:max-w-full rounded-xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default NewCourseBanner;
