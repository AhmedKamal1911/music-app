import React, { memo } from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
const PlayPauseButton = memo(({ isPlaying, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`absolute justify-center items-center inset-0 bg-black bg-opacity-50 group-hover:flex ${
        isActive ? "flex bg-black bg-opacity-70" : "hidden"
      }`}
    >
      {isPlaying && isActive ? (
        <FaPauseCircle size={35} className="text-gray-300" />
      ) : (
        <FaPlayCircle size={35} className="text-gray-300" />
      )}
    </div>
  );
});

export default PlayPauseButton;
