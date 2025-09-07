import CourseTable from "../../../pages/Course/CourseTable/CourseTable";
import CreateCourseForm from "../../../pages/Course/CreateCourse/CreateCourseForm";

const CreateCourse = () => {
  return (
    <>
      <div className="dark:dark:bg-violet-900 bg-violet-300">
        <CreateCourseForm />
        <CourseTable limitNumber={2} tableTitle="Created Course's" />
      </div>
    </>
  );
};

export default CreateCourse;
