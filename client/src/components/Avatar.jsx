import React from "react";
import { LuUserCircle2 } from "react-icons/lu";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-cyan-200",
  ];

  const random = Math.floor(Math.random() * 6);
  //console.log(random);
  return (
    <>
      <div
        className={`text-slate-800 rounded-full shadow-md border text-2xl font-bold ${bgColor[random]}`}
        style={{ width: width + "px", height: height + "px" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            width={width}
            height={height}
            alt={name}
            className="rounded-full"
          />
        ) : name ? (
          <div
            className="rounded-full overflow-hidden flex justify-center items-center"
            style={{ width: width + "px", height: height + "px" }}
          >
            {avatarName}
          </div>
        ) : (
          <LuUserCircle2 size={width} />
        )}
      </div>
    </>
  );
};

export default Avatar;
