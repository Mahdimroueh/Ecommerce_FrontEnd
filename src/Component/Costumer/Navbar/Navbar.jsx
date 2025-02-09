import { FaRegUser, FaSearch, FaRegHeart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuShoppingCart } from "react-icons/lu";
import NavbarMainList from "./NavbarMainList";
import { useEffect, useState } from "react";
import Logo from "./logo";
import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../../../AuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout } = useUserContext();

  const userAuth = user && user.authenticated && user.roles === "ROLE_USER";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div className="bg-[#2d2d2d] h-14 flex items-center  px-6">
        <div className="flex justify-between items-center text-white md:gap-x-2 xl:mx-20 w-full h-full lg:gap-x-5">
          <div className="flex items-center gap-x-2 h-full">
            <GiHamburgerMenu
              className="text-2xl lg:hidden cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
            <Logo />
            <div className="flex h-full gap-2 items-center">
              <NavLink
                to="/women"
                className={({ isActive }) =>
                  `hidden  h-full px-6 lg:flex lg:items-center ${
                    isActive ? "bg-[#525050]" : ""
                  }`
                }
              >
                WOMEN
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hidden  h-full px-6 lg:flex lg:items-center ${
                    isActive ? "bg-[#525050]" : ""
                  }`
                }
              >
                MEN
              </NavLink>
            </div>
          </div>
          <div className="flex gap-x-6">
            <Link
              to={`${userAuth ? "/user" : "/login"}`}
            >
              <FaRegUser className="text-xl" />
            </Link>
            <Link to={`${userAuth ? "/wishlist" : "/login"}`}>
              <FaRegHeart className="text-xl" />
            </Link>
            <FaSearch className="text-xl md:hidden" />
            <Link to={`${userAuth ? "/cart" : "/login"}`}>
              {" "}
              <LuShoppingCart className="text-xl" />
            </Link>
            {userAuth ? (
              <button onClick={logout} className="btn btn-primary btn-sm">
                logout
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <NavbarMainList isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
