import RegistrationForm from "@/components/modules/Authentication/RegistrationForm";
import { Link } from "react-router-dom";

export default function Registration() {
  const ImageLogin = `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757135939/eduLogin_i533tm.jpg`;
  const LogoImage = `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757134951/logoEducare-Photoroom_nkm3rp.png`;
  return (
    <>
      <div className="relative min-h-screen w-full bg-rose-300">
        {/* Background image */}
        <img
          src={ImageLogin}
          alt="Background"
          className="absolute inset-0 h-full w-full object-fill"
        />

        {/* Optional dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Main Container */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-around min-h-screen px-6 gap-10">
          {/* Logo (Left) */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={LogoImage}
              alt="EduCare Logo"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 invert"
            />
          </Link>

          {/* Form (Right) */}
          <div className="w-full max-w-md rounded-lg bg-black/60 p-6 shadow-lg backdrop-blur">
            <h2 className="mb-6 text-2xl font-bold text-center text-white">
              Sign In
            </h2>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </>
  );
}
