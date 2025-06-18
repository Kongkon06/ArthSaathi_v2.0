import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { userService } from "@/services/userService"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";
import { useUser } from "@/Atoms/UserContext";
import Header from "@/components/Header";

// Define Zod schemas
const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(5, "Password must be at least 8 characters"),
});

const signUpSchema = signInSchema
  .extend({
    firstname: z.string().min(2, "Name must be at least 2 characters"),
    lastname: z.string().min(2, "Name must be at least 2 characters"),
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
  const [isLoading, setIsLoading] = useState(false);
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

  const assignState = useCallback((fields: AuthFormData) => {
    let name = "";
    if ("firstname" in fields && "lastname" in fields) {
      name = fields.firstname + " " + fields.lastname;
    }
    setUser({
      id: "",
      name,
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
    setIsLoading(true);

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
        
        // Add smooth transition delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        await userService
          .signUp({
            email: data.email as string,
            password: data.password as string,
            confirmPassword: (data as SignUpFormData).confirmPassword,
            firstname: (data as SignUpFormData).firstname,
            lastname: (data as SignUpFormData).lastname,
          })
          .then((res) => {
            console.log(res.accessToken);
            localStorage.setItem("token", res.accessToken);
          });
        setSuccessMessage("Account created successfully!");
        
        // Add smooth transition delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }

      reset();
    } catch (error: any) {
      setFormError(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center p-4 pt-32">
        <div className="w-full max-w-md">
          {/* Card with slide-in animation */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 transform transition-all duration-700 hover:scale-[1.02] animate-in slide-in-from-bottom-4 min-h-[500px]">
            {/* Logo/Brand Circle */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">
                {isSignIn ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-500 text-sm">
                {isSignIn ? "Sign in to continue to ArthSaathi" : "Join ArthSaathi today"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {!isSignIn && (
                <div className="grid grid-cols-2 gap-3 animate-in slide-in-from-left duration-500">
                  <div>
                    <input
                      {...register("firstname", {
                        required: "First name is required",
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
                      placeholder="First name"
                    />
                    {errors.email && (
                      <>
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                        {toast.error(errors.email.message!)}
                      </>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("lastname", {
                        required: "Last name is required",
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
                      placeholder="Last name"
                    />
                    {errors.email && (
                      <>
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email.message}
                        </p>
                        {toast.error(errors.email.message!)}
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    {...register("password")}
                    type="password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {!isSignIn && (
                  <div className="relative animate-in slide-in-from-right duration-500">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      {...register("confirmPassword")}
                      type="password"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200"
                      placeholder="Confirm Password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {isSignIn && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500" />
                    <span className="ml-2 text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-purple-600 hover:text-purple-800 transition-colors">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {isSignIn ? "Signing In..." : "Creating Account..."}
                  </div>
                ) : (
                  <>
                    {isSignIn ? "Sign In" : "Create Account"}
                    <span className="ml-2">→</span>
                  </>
                )}
              </button>

              {formError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-in slide-in-from-top duration-300">
                  <p className="text-red-600 text-sm text-center">{formError}</p>
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-3 animate-in slide-in-from-top duration-300">
                  <p className="text-green-600 text-sm text-center flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {successMessage}
                  </p>
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign In */}
            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-purple-600 font-semibold hover:text-purple-800 transition-colors"
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
