import { FaBars } from "react-icons/fa";
import Logo from "../../Costumer/Navbar/logo";
import useAuth from "../../../api/Auth";

const AdminHeader = ({ isOpen, setIsOpen }) => {

  const { logout } = useAuth();

  return (
    <div className="h-16 shadow-lg px-5 top-0 left-0 w-full z-20 bg-white">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center h-full">
          <FaBars
            className="text-xl md:hidden cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
          <div className="hidden md:block">
            <Logo />
          </div>
        </div>
        <div>
          <button className="btn btn-primary rounded-xl" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
