import GenderPage from "../Component/Costumer/GenderPage";
import video from "../assets/_content_MW_HP HERO_ON CAMPUS_2880x1280_NO TEXT_zhpbbl.webm";
import img1 from "../assets/mw_global_gifting_moment_870x1110_v2.webp";
import img2 from "../assets/mw_global_carhartt_moment_870x1110.avif";
import img3 from "../assets/mw_global_new_in_moment_870x1110.avif";
import img4 from "../assets/mw_global_asos_design_premium_moment_870x1110.avif";
import { Link } from "react-router-dom";

const pictures = [
  {
    id: 1,
    img: img1,
    title: "GIFTING IS SERVED",
    desc: "Such good taste",
  },
  {
    id: 2,
    img: img2,
    title: "CARHARTT",
    desc: "What's trending",
  },
  {
    id: 3,
    img: img3,
    title: "THE LATEST DROPS",
    desc: "Fresh heat, incoming",
  },
  {
    id: 4,
    img: img4,
    title: "THE PREMIUM EDIT",
    desc: "Your elevated wardrobe",
  },
];
const MenPage = () => {
  return (
    <div>
      <Link to="men/products" className="btn btn-primary btn-outline">
        {" "}
        Check Product
      </Link>
      <GenderPage video={video} pictures={pictures} />
    </div>
  );
};

export default MenPage;
