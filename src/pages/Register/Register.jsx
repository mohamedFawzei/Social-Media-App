import regImg from "../../assets/images/Register/Regimg.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthRegister } from "../../features/auth/Hooks/UseAuthRegister";
import { signupSchema } from "../../Schemas/SigunUp";
import FloatingInput from "../../features/auth/components/FloatingInput/FloatingInput";
import SubmitButton from "../../features/auth/components/SubmitButton/SubmitButton";
import AuthFooter from "../../features/auth/components/AuthFooter/AuthFooter";
import AuthBanner from "../../features/auth/components/AuthBanner/AuthBanner";
import AuthHeader from "../../features/auth/components/AuthHeader/AuthHeader";
import AuthErrorAlert from "../../features/auth/components/AuthErrorAlert/AuthErrorAlert";
import GenderSelect from "../../features/auth/components/GenderSelect/GenderSelect";
import { useEffect } from "react";

const Register = () => {
  useEffect(() => {
    document.title = "Socail App | Register";
  }, []);
  const {
    createAcc,
    error: apiError,
    isLoading,
    loginGoogle,
  } = useAuthRegister();
  const handleGoogleSuccess = (response) => {
    loginGoogle(response);
  };
  /**

   *  Request Body Example

   *

   * "name": "Ahmed Bahnasy",

    "email":"bahnasy2040101@gmail.com",

    "password":"Bahnasy@123",

    "rePassword":"Bahnasy@123",

    "dateOfBirth":"7-10-1994",

    "gender":"male"

   */
  // --- Form Setup ---
  //  to capture data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(signupSchema),
  });

  // --- Submit Handler ---
  function onSubmit(data) {
    // console.log(data); // 1- captured the data
    //2- validation
    //3- call api
    createAcc(data);
  }

  return (
    <section className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col lg:flex-row font-sans transition-colors duration-300">
      {/* ================= Left Section ================= */}
      <AuthBanner
        imgSrc={regImg}
        title="Welcome Back"
        subtitle="Register"
        description="Join our professional community. Experience the difference with our premium platform."
      />

      {/* ================= Right Section ================= */}
      <div
        className="flex-1 bg-white dark:bg-gray-900 relative z-20 
                   -mt-10 rounded-t-[40px] px-6 py-10 shadow-2xl 
                   lg:mt-0 lg:rounded-none lg:rounded-l-[60px] lg:px-24 lg:py-0 lg:w-1/2
                   flex flex-col justify-center lg:min-h-screen transition-all duration-300"
      >
        <div className="w-full max-w-md mx-auto">
          {/* Header Text */}
          <AuthHeader
            title="Create Account"
            subtitle="Please enter your details properly"
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full"
          >
            {/* --- Global Error --- */}
            <AuthErrorAlert error={apiError} title="Registration Failed" />
            {/* --- Name --- */}
            <FloatingInput
              type="text"
              name="name"
              placeholder="Full Name"
              register={register}
              error={errors.name}
            />
            {/* --- Email --- */}
            <FloatingInput
              type="email"
              name="email"
              placeholder="Email Address"
              register={register}
              error={errors.email}
            />
            {/*--- Password --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FloatingInput
                type="password"
                name="password"
                placeholder="Password"
                register={register}
                error={errors.password}
              />
              <FloatingInput
                type="password"
                name="rePassword"
                placeholder="Confirm"
                register={register}
                error={errors.rePassword}
              />
            </div>
            {/* --- Date of Birth --- */}
            <FloatingInput
              type="date"
              name="dateOfBirth"
              register={register}
              error={errors.dateOfBirth}
            />

            {/* --- Gender  --- */}
            <GenderSelect register={register} error={errors.gender} />

            {/* --- Submit  --- */}
            <SubmitButton
              isLoading={isLoading}
              text="Create Account"
              loadingText="Creating..."
              className="mt-4"
            />

            {/* --- Footer --- */}
            <AuthFooter
              text="Already a member?"
              linkText="Log In"
              to="/login"
              onGoogleSuccess={handleGoogleSuccess}
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
