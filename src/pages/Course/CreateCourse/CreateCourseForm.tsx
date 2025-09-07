import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,

  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

import {
  CourseCategoryEnum,
  CourseStatusEnum,
  createCourseZodSchema,
} from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
// import { Upload } from "lucide-react";
import React from "react";
import { useAddCourseMutation } from "@/redux/features/Course/course.api";
import { toast } from "sonner";

type CourseFormValues = z.infer<typeof createCourseZodSchema>;

export default function CreateCourseForm() {
  const [preview, setPreview] = React.useState<string | null>(null);

  const [createCourse, { isLoading }] = useAddCourseMutation();
  // const [createCourse, { isLoading, isSuccess, isError, error }] = useAddCourseMutation();

  const form = useForm<CourseFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(createCourseZodSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      category: "",
      seat: 0,
      price: 0,
      duration: 0,
      instructor: "",
      image: undefined,
      status: "", // ⚡ must be "draft" or "published", not undefined
      //   isDeleted: false,
    },
    mode: "onChange",
  });

  const CourseStatusOptions = Object.entries(CourseStatusEnum).map(
    ([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      value: value,
    })
  );

  //
  const CourseCategoryOptions = Object.entries(CourseCategoryEnum).map(
    ([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      value: value,
    })
  );

  //

  const onSubmit = async (values: CourseFormValues) => {
    console.log(values);
    const { image, ...courseData } = values;
    const formData = new FormData();

    formData.append("data", JSON.stringify(courseData));
    formData.append("file", image as File);

    // console.log(formData.get("data"));
    // console.log(formData.get("file"));

    try {
      const res = await createCourse(formData).unwrap();
      console.log("res:", res);

      if (res) {
        toast.success("Course Added Successfully!");
      }

      form.reset({
        title: "",
        description: "",
        category: "",
        seat: 0,
        price: 0,
        duration: 0,
        instructor: "",
        status: "",
        image: undefined,
      });
      setPreview(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(`Something went wrong:${err?.data?.message}`);
      } else {
        toast.error("Something went wrong.");
      }
      console.error(err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      form.setValue("image", file); // store filename or handle upload separately
    }
  };

  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center justify-start px-4 py-4  transition-colors duration-300 "
        )}
      >
        <div className="flex flex-col gap-6 w-full max-w-md md:p-10 rounded-xl shadow-lg transition-colors duration-300 bg-card text-card-foreground">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h1
              className={cn("text-2xl font-bold dark:text-white text-gray-900")}
            >
              Create Course
            </h1>
            <p className={cn("text-sm dark:text-gray-300  text-gray-600")}>
              Fill in the details Here!
            </p>
          </div>

          {/* Form */}
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Title & Instructor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-center">
                          Course Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter course title"
                            className="rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Instructor */}
                  <FormField
                    control={form.control}
                    name="instructor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Instructor Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Instructor name"
                            className="rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Category & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium">
                          Category
                        </FormLabel>
                        <Select
                          key={field.value || ""}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CourseCategoryOptions.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-sm font-medium">
                          Status
                        </FormLabel>
                        <Select
                          key={field.value || ""}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition">
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CourseStatusOptions.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Seat */}
                  <FormField
                    control={form.control}
                    name="seat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Seat
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Price */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Price
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  {/* Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Duration (Day's)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image */}
                <FormItem className="md:col-span-2">
                  <FormLabel>Course Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </FormControl>
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-3 h-32 w-32 object-cover rounded-md border"
                    />
                  )}
                </FormItem>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Enter course description"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
                        Keep it under 500 characters.
                      </FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/*  */}
                {/* Submit Button */}
                <Button
                  type="submit"
                  className={cn(
                    "w-full cursor-pointer text-white font-medium py-3 rounded-lg transition-colors dark:bg-violet-700  bg-violet-600 hover:bg-violet-700"
                  )}
                  disabled={!form.formState.isValid || isLoading}
                >
                  {isLoading ? "Creating.." : "Create"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
