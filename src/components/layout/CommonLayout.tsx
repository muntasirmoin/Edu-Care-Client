import type { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";

interface IProps {
  children: ReactNode;
}

const CommonLayout = ({ children }: IProps) => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
