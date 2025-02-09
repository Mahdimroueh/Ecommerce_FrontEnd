import {
  FaBox,
  FaChartLine,
  FaCogs,
  FaHome,
  FaTags,
  FaTimes,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ListStyle = "grid grid-cols-[auto,1fr] gap-4 hover:text-gray-300 h-5";
const spanStyle = "md:hidden md:group-hover:inline-block";
const AdminNavbar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <div
        className={` ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-56 md:translate-x-0 md:w-[52px]"
        } 
        group z-30 bg-[#202B46] md:relative fixed left-0 top-0 w-56 h-full md:hover:w-56 transition-all duration-300 overflow-hidden`}
        
      >
        <ul className="space-y-5 p-4 text-white">
          <li className="w-full md:hidden">
            <FaTimes
              size={20}
              className="ml-auto cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </li>
          <li className={ListStyle}>
            <FaHome size={20} />
            <Link to="/" className={spanStyle}>
              Dashboard
            </Link>
          </li>
          <li className={ListStyle}>
            <FaBox size={20} />
            <Link to="/product" className={spanStyle}>
              Products
            </Link>
          </li>
          <li className={ListStyle}>
            <FaUsers size={20} />
            <Link to="/customer" className={spanStyle}>
              Customers
            </Link>
          </li>
          <li className={ListStyle}>
            <FaChartLine size={20} />
            <Link to="/analytic" className={spanStyle}>
              Analytics
            </Link>
          </li>
          <li className={ListStyle}>
            <FaTags size={20} />
            <Link className={spanStyle}>Promotions</Link>
          </li>
          <li className={ListStyle}>
            <FaCogs size={20} />
            <Link className={spanStyle}>Settings</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminNavbar;
