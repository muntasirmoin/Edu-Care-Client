import CourseDeleteTable from "@/pages/Course/CourseDeleteTable/CourseDeleteTable";

const DeleteCourse = () => {
  return (
    <>
      <CourseDeleteTable limitNumber={10} tableTitle="Course's" />
    </>
  );
};

export default DeleteCourse;
