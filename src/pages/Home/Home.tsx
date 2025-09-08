import Banner from "./Banner/Banner";
import NewCourseBanner from "./Banner/NewCourseBanner";
import HomeCourse from "./Course/HomeCourse";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  return (
    <>
      <Banner />
      <HomeCourse />
      <NewCourseBanner />
      <Reviews />
    </>
  );
};

export default Home;
