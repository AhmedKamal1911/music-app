import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

const Volume = ({ setVolumeLevel, volumeLevel, min = 0, max = 1 }) => {
  return (
    <div>
      <div className="flex items-center ">
        {volumeLevel <= 1 && volumeLevel > 0.5 && (
          <BsFillVolumeUpFill
            size={25}
            color="#FFF"
            onClick={() => setVolumeLevel(0)}
          />
        )}
        {volumeLevel <= 0.5 && volumeLevel > 0 && (
          <BsVolumeDownFill
            size={25}
            color="#FFF"
            onClick={() => setVolumeLevel(0)}
          />
        )}
        {volumeLevel === 0 && (
          <BsFillVolumeMuteFill
            size={25}
            color="#FFF"
            onClick={() => setVolumeLevel(1)}
          />
        )}
        <input
          type="range"
          step="any"
          value={volumeLevel}
          min={min}
          max={max}
          onChange={(e) => setVolumeLevel(+e.target.value)}
          className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
        />
      </div>
    </div>
  );
};

export default Volume;
