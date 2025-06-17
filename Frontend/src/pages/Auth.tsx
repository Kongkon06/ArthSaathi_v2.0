import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { userService } from "@/services/userService"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { useUser } from "@/Atoms/UserContext";

// Define Zod schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 8 characters"),
});

const signUpSchema = signInSchema
  .extend({
    name: z.string().min(2, "Name must be at least 2 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function AuthForm() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
  });

  interface SignInFormData {
    email: string;
    password: string;
  }

  interface SignUpFormData extends SignInFormData {
    firstname: string;
    lastname: string;
    confirmPassword: string;
  }

  type AuthFormData = SignInFormData | SignUpFormData;

  const assignState = useCallback((fields : AuthFormData) => {
    setUser({
      id: "",
      name: "",
      email: fields.email,
      password: fields.password,
      phoneNumber: "",
      address: "",
      token: "",
    });
  }, []);

  const onSubmit = async (data: AuthFormData): Promise<void> => {
    setFormError("");
    setSuccessMessage("");

    try {
      if (isSignIn) {
        const res = await userService.login(
          data.email as string,
          data.password as string
        );
        console.log(res);
        localStorage.setItem("token", res.accessToken);
        assignState(data)
        setSuccessMessage("Login successful! Redirecting...");
        navigate("/dashboard");
        // Redirect to dashboard after successful login
      } else {
        await userService
          .signUp({
            email: data.email as string,
            password: data.password as string,
            confirmPassword: (data as SignUpFormData).confirmPassword,
            firstName: (data as SignUpFormData).firstname,
            lastName: (data as SignUpFormData).lastname,
          })
          .then((res) => {
            console.log(res.accessToken);
            localStorage.setItem("token", res.accessToken);
          });
        setSuccessMessage("Account created successfully!");
        navigate("/dashboard"); // Redirect to dashboard after successful signup
      }

      reset();
    } catch (error: any) {
      setFormError(error.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-50 rounded-xl shadow-lg p-8 space-y-6 border border-slate-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-800">Welcome</h1>
          <p className="text-purple-600 mt-2">
            {isSignIn ? "Sign in to continue" : "Create a new account"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-purple-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              isSignIn
                ? "bg-purple-500 text-white shadow"
                : "text-purple-700 hover:bg-purple-200"
            }`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              !isSignIn
                ? "bg-purple-500 text-white shadow"
                : "text-purple-700 hover:bg-purple-200"
            }`}
            onClick={() => setIsSignIn(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!isSignIn && (
            <div className="flex justify-between gap-4">
              <div>
                <label className="block flex flex-start text-slate-800 mb-1">
                  First Name
                </label>
                <input
                  {...register("firstname", {
                    required: "First name is required",
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 placeholder-slate-500"
                  placeholder="John"
                />
                {errors.email && (
                  <>
                    <p className="text-slate-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                    {toast.error(errors.email.message!)}
                  </>
                )}
              </div>

              <div>
                <label className="block flex flex-start text-slate-800 mb-1">
                  Last Name
                </label>
                <input
                  {...register("lastname", {
                    required: "Last name is required",
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 placeholder-slate-500"
                  placeholder="Doe"
                />
                {errors.email && (
                  <>
                    <p className="text-slate-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
                    {toast.error(errors.email.message!)}
                  </>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block flex flex-start text-slate-800 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 placeholder-slate-500"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-slate-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block flex flex-start text-slate-800 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 placeholder-slate-500"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-slate-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {!isSignIn && (
            <div>
              <label className="block flex flex-start text-slate-800 mb-1">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-slate-100 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 text-purple-900 placeholder-slate-500"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-slate-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r underline from-purple-500 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg shadow-purple-200"
          >
            {isSignIn ? "Sign In" : "Create Account"}
          </button>

          {formError && (
            <p className="text-slate-600 text-center">{formError}</p>
          )}
          {successMessage && (
            <p className="text-emerald-600 text-center">{successMessage}</p>
          )}
        </form>

        <div className="text-center text-purple-700">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="font-medium hover:text-purple-900 transition-colors"
          >
            {isSignIn
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
