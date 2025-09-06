import z from "zod";

export const createCourseZodSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(100),
  description: z.string().max(500).optional(),
  category: z.string().optional(),
  seat: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z
      .number({
        message: "Number must be a number",
      })
      .nonnegative("Number must be 0 or greater")
  ),
  price: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z
      .number({
        message: "Number must be a number",
      })
      .nonnegative("Number must be 0 or greater")
  ),
  duration: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z
      .number({
        message: "Number must be a number",
      })
      .nonnegative("Number must be 0 or greater")
  ),
  instructor: z.string().max(100).optional(),
  image: z
    .instanceof(File, { message: "Image must be a valid file." })
    .refine((file) => file.size < 5 * 1024 * 1024, { message: "Max size 5MB" })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only JPG, PNG, WebP allowed",
      }
    )
    .optional(),
  //   status: z.preprocess((val) => val ?? "draft", z.enum(["draft", "published"])),
  status: z.string().optional(),

  //   isDeleted: z.boolean().default(false),
});

export const CourseStatusEnum = {
  Draft: "draft",
  Published: "published",
} as const;

export type CourseStatusEnum = keyof typeof CourseStatusEnum;

export const CourseCategoryEnum = {
  PROGRAMMING: "programming",
  DESIGN: "design",
  MARKETING: "marketing",
  BUSINESS: "business",
  MUSIC: "music",
  MATH: "Math",
  SCIENCE: "Science",
  HISTORY: "History",
  ENGLISH: "English",
} as const;

export type CourseCategoryEnum = keyof typeof CourseCategoryEnum;
