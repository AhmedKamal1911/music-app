import { forwardRef, useImperativeHandle, useRef } from "react";

const Player = forwardRef(function Player(
  { src, onUpdateTime, onLoadedData, onCanPlay, onEmptied, loop },
  ref
) {
  const audioRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        play() {
          audioRef.current.play().catch((error) => {
            console.log(error);
          });
          console.log("played");
        },
        pause() {
          audioRef.current.pause();
          console.log("paused");
        },
        getReadyState() {
          return audioRef.current.readyState;
        },
        setVolume(volume) {
          audioRef.current.volume = volume;
        },
        setCurrentTime(currentTime) {
          audioRef.current.currentTime = currentTime;
        },
        load() {
          audioRef.current.load();
        },
      };
    },
    []
  );

  const sources = [
    {
      src,
      type: src?.split(".")[src.split(".")?.length - 1],
    }, // Adjust MIME type as needed
  ];

  return (
    <audio
      ref={audioRef}
      loop={loop}
      onCanPlay={onCanPlay}
      onTimeUpdate={onUpdateTime}
      onLoadedData={onLoadedData}
      onEmptied={onEmptied}
    >
      {sources?.map((source, index) => (
        <source
          key={index}
          src={source?.src ?? ""}
          type={source ? `audio/${source.type}` : undefined}
        />
      ))}
    </audio>
  );
});

export default Player;
