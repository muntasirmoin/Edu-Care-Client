const Logo = () => {
  const LogoImage = `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757134951/logoEducare-Photoroom_nkm3rp.png`;
  return (
    <div>
      <img
        src={LogoImage}
        alt="EduCare Logo"
        className="h-10 w-auto dark:invert" // adjust size as needed
      />
    </div>
  );
};

export default Logo;
