import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

const Controls = ({
  isPlaying,
  handlePlayPause,
  handleNextSong,
  handlePrevSong,
  onShuffleClick,
  shuffle,
  toggleLoop,
  loop,
}) => {
  return (
    <div className="flex flex-row items-center gap-4">
      <BsArrowRepeat
        size={20}
        color={loop ? "red" : "white"}
        className="block cursor-pointer"
        onClick={toggleLoop}
      />
      <div className="flex flex-row items-center">
        <MdSkipPrevious
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handlePrevSong}
        />
        {isPlaying ? (
          <BsFillPauseFill
            size={45}
            color="#FFF"
            className="cursor-pointer"
            onClick={handlePlayPause}
          />
        ) : (
          <BsFillPlayFill
            size={45}
            color="#FFF"
            className="cursor-pointer"
            onClick={handlePlayPause}
          />
        )}

        <MdSkipNext
          size={30}
          color="#FFF"
          className="cursor-pointer"
          onClick={handleNextSong}
        />
      </div>
      <BsShuffle
        size={20}
        color={shuffle ? "red" : "white"}
        onClick={onShuffleClick}
        className="block cursor-pointer"
      />
    </div>
  );
};

export default Controls;
