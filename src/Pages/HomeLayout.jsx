import { Outlet } from "react-router-dom";
import Navbar from "../Component/Costumer/Navbar/Navbar";
import Footer from "../Component/Costumer/footer/Footer";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <NavbarSubList /> */}
      <div className="lg:w-[1400px] mx-auto mt-5 flex-grow w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
