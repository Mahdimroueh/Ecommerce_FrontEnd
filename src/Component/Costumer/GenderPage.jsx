import React from "react";

const GenderPage = ({ video, pictures }) => {
  return (
    <div className="px-4 mt-16 flex flex-col gap-y-14 xl:mx-20">
      <div>
        <video controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
        {pictures.map((item) => {
          return (
            <div key={item.id} className="flex flex-col items-center gap-y-4">
              <img src={item.img} alt="" />
              <h4 className="font-semibold text-sm tracking-wide">
                {item.title}
              </h4>
              <p>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenderPage;
