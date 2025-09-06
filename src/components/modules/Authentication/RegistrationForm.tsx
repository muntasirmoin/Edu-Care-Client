import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/Auth/auth.api";

// ---------------- Role Enum ----------------
export const RoleEnum = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type RoleEnum = keyof typeof RoleEnum;

// ---------------- Zod Schema ----------------
const createUserZodSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),

  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." })
    .email({ message: "Invalid email address format." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    }),

  address: z
    .string()
    .max(200, { message: "Address cannot exceed 200 characters." })
    .optional(),

  // ✅ role is always present, defaults to USER
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

type CreateUserInput = z.infer<typeof createUserZodSchema>;

// ---------------- Component ----------------
function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(createUserZodSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      role: "USER",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<CreateUserInput> = async (data) => {
    console.log("registration data", data);

    const transformedData = {
      ...data,
      email: data.email?.trim() === "" ? undefined : data.email,
      address: data.address?.trim() === "" ? undefined : data.address,
    };

    try {
      const res = await register(transformedData).unwrap();
      console.log("res", res);

      if (res.success) {
        toast.success("Account Created Successfully");
        setTimeout(() => {
          navigate("/login");
          toast.info("Login Here!");
        }, 1500);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (err.data?.message === "User Already Exist") {
        toast.error("An account with this email already exists.");
      } else {
        if (err.data?.message) {
          toast.error(err.data?.message);
        } else {
          toast.error("Registration failed. Try again.");
        }
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white"> Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Name"
                      className="border border-rose-500 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email (Optional) */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="example@domain.com"
                      value={field.value || ""}
                      className="border border-rose-500 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="************"
                      {...field}
                      value={field.value || ""}
                      className="border border-rose-500 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address (Optional) */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Address</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={100}
                      {...field}
                      value={field.value || ""}
                      placeholder="Address"
                      className="border border-rose-500 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ✅ Role Dropdown (optional for Admin panel only) */}
            {/*
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border border-rose-500">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            */}

            <Button
              type="submit"
              className="w-full cursor-pointer text-white bg-violet-700 hover:bg-violet-800 hover:border-green-100"
              disabled={!form.formState.isValid || isLoading}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-white text-sm">
        Have an account?{" "}
        <Link
          to="/login"
          replace
          className="underline underline-offset-4 hover:text-rose-500"
        >
          Login
        </Link>
      </div>
      <div className="text-center text-white text-sm">
        Back to Home?{" "}
        <Link
          to="/"
          replace
          className="underline underline-offset-4 hover:text-rose-500"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
