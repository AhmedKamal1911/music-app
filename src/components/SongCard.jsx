import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

import { getStrapiMediaURL } from "@/utils";
import { forwardRef, memo } from "react";

const SongCard = memo(
  forwardRef(
    (
      { song, i, data, imgSrc, togglePlayClick, isPlaying, isSelected },
      ref
    ) => {
      return (
        <div
          ref={ref}
          className="flex flex-col p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
        >
          <div className="relative w-full group">
            <img
              src={getStrapiMediaURL(imgSrc)}
              alt=""
              className="object-cover w-full aspect-[1/0.8] select-none bg-slate-300/20"
            />
            <div
              onClick={() => togglePlayClick(i, song, data)}
              className={`absolute justify-center items-center inset-0 bg-black bg-opacity-50 group-hover:flex ${
                isSelected ? "flex bg-black bg-opacity-70" : "hidden"
              }`}
            >
              {isPlaying ? (
                <FaPauseCircle size={35} className="text-gray-300" />
              ) : (
                <FaPlayCircle size={35} className="text-gray-300" />
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <h3 className="font-semibold text-lg text-white truncate text-center select-none max-w-[150px]">
              {song.title}
            </h3>
          </div>
        </div>
      );
    }
  )
);

export default SongCard;
