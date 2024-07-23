import { useCallback, useEffect, useRef } from "react";

// converts the time to format 0:00
const getTime = (time) =>
  `${Math.round(time / 60)}:${`0${Math.round(time % 60)}`.slice(-2)}`;
const Seekbar = ({
  audioCurrentTime,
  seekbarProgress,
  onAudioTimelineClick,
  duration,
  setPlayerProgress, //  first: 0x15
}) => {
  const setProgressCallbackRef = useRef(setPlayerProgress); //  0x15 (inside scope: duration = 0 )
  useEffect(() => {
    setProgressCallbackRef.current = setPlayerProgress;
  }, [setPlayerProgress]);
  const seekbarRef = useRef(null);
  useEffect(() => {
    const onSeekbarMouseMove = (moveEvent) => {
      setProgressCallbackRef.current(moveEvent);
    };
    const onDoucmentMouseMove = (e) => {
      const { clientX } = e;
      const minInput = seekbarRef.current.offsetLeft;
      const maxInput =
        seekbarRef.current.clientWidth + seekbarRef.current.offsetLeft;
      const minOutput = 0;
      const maxOutput = seekbarRef.current.clientWidth;

      // Bound clientX between minInput and maxInput
      const boundedClientX = Math.max(minInput, Math.min(clientX, maxInput));

      // Map boundedClientX to the new range
      const mappedValue =
        ((boundedClientX - minInput) / (maxInput - minInput)) *
          (maxOutput - minOutput) +
        minOutput;
      const event = {
        offsetX: mappedValue,
        currentTarget: seekbarRef.current,
      };
      setProgressCallbackRef.current(event);
    };
    const onPointerDown = () => {
      seekbarRef.current.addEventListener("pointermove", onSeekbarMouseMove);
      document.addEventListener("mousemove", onDoucmentMouseMove);
      document.addEventListener("pointerup", handlePointerUp);
      console.log("mouse down");
    };
    seekbarRef.current.addEventListener("pointerdown", onPointerDown);

    const handlePointerUp = () => {
      seekbarRef.current.removeEventListener("pointermove", onSeekbarMouseMove);
      document.removeEventListener("mousemove", onDoucmentMouseMove);
      document.removeEventListener("pointerup", handlePointerUp);
      console.log("mouse up");
    };

    return () => {
      seekbarRef.current.removeEventListener("pointerdown", onPointerDown);
      seekbarRef.current.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);
  return (
    <div className="self-center w-full flex gap-2 items-center justify-center">
      <span className="text-white">{getTime(audioCurrentTime)}</span>
      <div
        ref={seekbarRef}
        className="h-[5px] w-[300px] bg-[#dfdfdf] cursor-pointer group touch-none"
        onClick={onAudioTimelineClick}
      >
        <div
          style={{ width: `${seekbarProgress}%` }}
          className={`relative bg-[#e61946] h-full after:absolute after:w-[15px] after:h-[15px] after:bg-[#e61946] after:rounded-full after:right-0 after:top-1/2 after:-translate-y-1/2  after:translate-x-1/2 after:hidden group-hover:after:block`}
        />
      </div>

      <span className="text-white">{getTime(duration)}</span>
    </div>
  );
};

export default Seekbar;
