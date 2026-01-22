import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import regImg from "../../assets/images/Register/Regimg.png";
import FloatingInput from "../../features/auth/components/FloatingInput/FloatingInput";
import { useAuthLogin } from "../../features/auth/Hooks/UseAuthLogin";
import { signinSchema } from "../../Schemas/Signin";
import SubmitButton from "../../features/auth/components/SubmitButton/SubmitButton";
import AuthFooter from "../../features/auth/components/AuthFooter/AuthFooter";
import AuthBanner from "../../features/auth/components/AuthBanner/AuthBanner";
import AuthHeader from "../../features/auth/components/AuthHeader/AuthHeader";
import AuthErrorAlert from "../../features/auth/components/AuthErrorAlert/AuthErrorAlert";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Socail App | Login";
  }, []);
  const { loginAcc, loginGoogle, error: apiError, isLoading } = useAuthLogin();

  const handleGoogleSuccess = (response) => {
    loginGoogle(response);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signinSchema),
  });

  function onSubmit(data) {
    loginAcc(data);
  }

  return (
    <section className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col lg:flex-row font-sans transition-colors duration-300">
      {/* =================  Left Section  ================= */}

      <div
        className="flex-1 bg-white dark:bg-gray-900 relative z-20 
                   -mb-10 lg:mb-0 rounded-b-[40px] lg:rounded-none lg:rounded-r-[60px] 
                   px-6 py-10 shadow-2xl 
                   lg:px-24 lg:py-0 lg:w-1/2
                   flex flex-col justify-center lg:min-h-screen transition-all duration-300 order-2 lg:order-1"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Header Text */}
          <AuthHeader
            title="Welcome Back! 👋"
            subtitle="Please enter your details to sign in"
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 w-full"
          >
            {/* --- Global Error Alert --- */}
            <AuthErrorAlert error={apiError} title="Login Failed" />

            {/* --- Email Input --- */}
            <FloatingInput
              type="email"
              name="email"
              placeholder="Email Address"
              register={register}
              error={errors.email}
            />

            {/* --- Password Input --- */}
            <div>
              <FloatingInput
                type="password"
                name="password"
                placeholder="Password"
                register={register}
                error={errors.password}
              />
              {/* Forgot Password Link */}
              <div className="text-right mt-2">
                <Link className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* --- Submit Button --- */}
            <SubmitButton
              isLoading={isLoading}
              text="LOG IN"
              loadingText="Signing In"
              className="mt-2"
            />

            {/* --- Footer & Google Auth --- */}
            <AuthFooter
              text="Don't have an account?"
              linkText="Sign Up"
              to="/register"
              onGoogleSuccess={handleGoogleSuccess}
              isLoading={isLoading}
              isGoogleTop={true}
            />
          </form>
        </div>
      </div>

      {/* ================= Right Section  ================= */}
      {/* Header */}
      <AuthBanner
        imgSrc={regImg}
        title="Nice to see you again"
        subtitle="Login"
        description="Welcome back to our professional community. Access your personalized dashboard now."
        isRightSide={true}
      />
    </section>
  );
};

export default Login;
