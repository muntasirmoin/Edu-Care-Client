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

  const [createCourse] = useAddCourseMutation();

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
      toast.success("Course Added");

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
    } catch (err) {
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
              Create Your Account
            </h1>
            <p className={cn("text-sm dark:text-gray-300  text-gray-600")}>
              Fill in the details to get started
            </p>
          </div>

          {/* Form */}
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Category</FormLabel>
                      <Select
                        key={field.value || ""}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Seat */}
                <FormField
                  control={form.control}
                  name="seat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seat</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          //   placeholder="0"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          //   placeholder="0"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (hours)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          //   placeholder="0"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Instructor */}
                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor</FormLabel>
                      <FormControl>
                        <Input placeholder="Instructor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Status</FormLabel>
                      <Select
                        key={field.value || ""}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                {/*  */}
                {/* Submit Button */}
                <Button
                  type="submit"
                  className={cn(
                    "w-full text-white font-medium py-3 rounded-lg transition-colors dark:bg-violet-700  bg-violet-600 hover:bg-violet-700"
                  )}
                  disabled={!form.formState.isValid}
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
