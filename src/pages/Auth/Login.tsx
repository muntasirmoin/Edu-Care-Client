import { LoginForm } from "@/components/modules/Authentication/LoginForm";
import { Link } from "react-router-dom";

// import { LoginForm } from "@/components/modules/Authentication/LoginForm";
// import Logo from "@/assets/icons/Logo";

export default function Login() {
  const ImageLogin = `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757152204/a3_y3wlc9.avif`;
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

        {/* Form Container */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-20 md:pt-5">
          {/* Logo */}
          <Link to="/" className="inline-block cursor-pointer">
            <img
              src={LogoImage}
              alt="EduCare Logo"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 invert block"
            />
          </Link>

          {/* Form box */}
          <div className="w-full max-w-md mt-8 rounded-lg bg-black/60 p-4 mb-5 shadow-lg backdrop-blur">
            <h2 className="mb-4 text-2xl font-bold text-center text-white">
              Log In
            </h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
