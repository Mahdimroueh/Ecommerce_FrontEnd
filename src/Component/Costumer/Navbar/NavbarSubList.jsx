import { Link } from "react-router-dom";

const arr = [
  {
    title: "Top Rated Clothing",
    subfield: ["New in", "T-Shirts&Vests"],
  },
  {
    title: "Buy 3+ T-shirts, Save 15%",
    subfield: [
      "Shirts",
      "Hoodies & Sweatshirts",
      "Jackets & Coats",
      "Jumpers & Cardigans",
      "Jeans",
      "Trousers & Chinos",
      "Loungewear",
      "Activewear",
      "Cargo Trousers",
      "Co-ords",
      "Curve & Plus Size",
      "Exclusives at ASOS",
      "Joggers",
      "Jorts",
      "Last chance to buy",
      "Multipacks",
      "Plus Size",
      "Polo shirts",
      "Premium",
      "Shorts",
      "Socks",
      "Swimwear",
      "Tall",
      "Tracksuits",
      "Underwea",
      "Suits & Tailoring",
    ],
  },
];
const NavbarSubList = () => {
  return (
    <div className="max-h-[80vh]">
      <h3>SHOP BY PRODUCT</h3>
      <ul className="grid">
        {arr.map(({ title, subfield }, i) => {
          return (
            <li key={i}>
              <Link className="">{title}</Link>
              <ul className="grid">
                {subfield.map((item, subI) => {
                  return (
                    <Link key={`${i}-${subI}`} className="">
                      {item}
                    </Link>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavbarSubList;
