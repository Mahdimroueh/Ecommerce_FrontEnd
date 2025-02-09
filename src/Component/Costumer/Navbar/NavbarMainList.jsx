import menImg from "../../../assets/1655972755212_mega-menu-side-02.avif";
import womenImg from "../../../assets/1655972785443_mega-menu-side-03.avif";
import kidsImg from "../../../assets/1655972821353_mega-menu-side-04.avif";
import toysImg from "../../../assets/1655972847494_mega-menu-side-05.avif";
import homeLivingImg from "../../../assets/1655972821353_mega-menu-side-04.avif";
import electronicImg from "../../../assets/images.jfif";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
// ActivewearTopshopMarketplaceSale
// const List = [
//   { id: "1", text: "Men", imgUrl: menImg },
//   { id: "2", text: "Women", imgUrl: womenImg },
//   { id: "3", text: "Kids", imgUrl: kidsImg },
//   { id: "4", text: "Toys", imgUrl: toysImg },
//   { id: "5", text: "Electronic", imgUrl: electronicImg },
//   { id: "6", text: "Home&Living", imgUrl: homeLivingImg },
//   { id: "6", text: "Home&Living", imgUrl: homeLivingImg },
//   { id: "6", text: "Home&Living", imgUrl: homeLivingImg },
// ];

const List = [
  { id: "1", text: "New in", imgUrl: menImg },
  { id: "2", text: "Clothing", imgUrl: womenImg },
  { id: "3", text: "Trending", imgUrl: kidsImg },
  { id: "4", text: "Dresses", imgUrl: toysImg },
  { id: "5", text: "Shoes", imgUrl: electronicImg },
  { id: "6", text: "Face + Body", imgUrl: homeLivingImg },
  { id: "7", text: "Accessories", imgUrl: homeLivingImg },
  { id: "8", text: "Brands", imgUrl: homeLivingImg },
];
const NavbarMainList = ({ isOpen, setIsOpen }) => {
  return (
    <div className="lg:bg-[#525050]  lg:flex lg:items-center lg:h-14 lg:text-white">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <ul
        className={`${isOpen ? "translate-x-0" : "translate-x-[-100%]"} 
        h-[100vh] absolute w-[320px]  left-0 top-0  flex flex-col gap-y-3 z-20 bg-white py-10 px-4 transition-transform duration-300 hide-scrollbar overflow-scroll
        lg:relative lg:w-full lg:translate-x-0 lg:bg-transparent lg:py-0  lg:flex-row  lg:h-full lg:px-8 xl:mx-20`}
      >
        <button
          className="absolute top-0 right-0 w-10 h-10 border-2  lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes />
        </button>
        {List.map(({ id, text, imgUrl }) => {
          return (
            <li
              key={id}
              className="lg:flex lg:items-center lg:hover:bg-white lg:hover:text-black lg:h-full lg:transition-all lg:duration-300 lg:px-3"
            >
              <Link
                className={`block bg-cover w-full p-8  lg:bg-none lg:p-0 text-xs tracking-widest `}
                style={{ backgroundImage: isOpen ? `url(${imgUrl})` : "none" }}
              >
                {text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavbarMainList;
