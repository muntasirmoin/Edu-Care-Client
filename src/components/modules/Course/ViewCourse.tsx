import CourseTable from "@/pages/Course/CourseTable/CourseTable";

const ViewCourse = () => {
  return (
    <>
      <CourseTable limitNumber={8} tableTitle="List Of Courses" />
    </>
  );
};

export default ViewCourse;
