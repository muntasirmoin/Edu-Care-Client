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
import { useLoginMutation } from "@/redux/features/Auth/auth.api";

import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
  });
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);
    try {
      const res = await login(data).unwrap();
      console.log("res", res);

      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);

      if (err.data.message === "User is deleted") {
        toast.error("Account is deleted");
      }

      if (err.data.message === "User does not exist") {
        toast.error("Account does not exist");
      }

      if (err.data.message === "Password does not match") {
        toast.error("Incorrect Password");
      }
    }
  };

  //
  // demo login handler
  const handleDemoLogin = (role: "user" | "admin") => {
    let creds = { email: "", password: "" };
    if (role === "user")
      creds = { email: "user@gmail.com", password: "Muntasir1!" };
    if (role === "admin")
      creds = { email: "admin@gmail.com", password: "Muntasir1!" };

    form.setValue("email", creds.email);
    form.setValue("password", creds.password);
    form.handleSubmit(onSubmit)(); // directly submit
  };

  //

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center text-white">
        <h1 className="text-2xl font-bold">To Your Account</h1>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@domain.com"
                      {...field}
                      value={field.value || ""}
                      className="border text-white border-gray-600 focus:ring-2 focus:ring-violet-500 rounded-md w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      //   maxLength={5}
                      placeholder="*****"
                      {...field}
                      value={field.value || ""}
                      className="border text-white border-gray-600 focus:ring-2 focus:ring-violet-500 rounded-md w-full tracking-widest"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  */}

            {/* Demo Login Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
              <Button
                onClick={() => handleDemoLogin("user")}
                className="sm:w-auto cursor-pointer text-white bg-violet-700 hover:bg-violet-800 hover:border-green-100"
              >
                Login as User
              </Button>
              <Button
                onClick={() => handleDemoLogin("admin")}
                className="sm:w-auto cursor-pointer text-white bg-violet-700 hover:bg-violet-800 hover:border-green-100"
              >
                Login as Admin
              </Button>
            </div>

            {/*  */}

            <Button
              type="submit"
              className="w-full cursor-pointer text-white bg-violet-700 hover:bg-violet-800 hover:border-green-100"
              disabled={!form.formState.isValid || isLoading}
            >
              {isLoading ? "Login...." : "Login"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-white text-sm">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          replace
          className="underline underline-offset-4 hover:text-rose-500"
        >
          SignIn
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
