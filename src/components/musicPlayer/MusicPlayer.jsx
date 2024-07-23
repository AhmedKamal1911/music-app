import { Controls, Player, Seekbar, Track, Volume } from "@/components";
import {
  nextSong,
  playPause,
  prevSong,
  shuffleSong,
} from "@/redux/features/playerSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { getStrapiMediaURL } from "@/utils";
const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { isPlaying, activeSong, currentSongs } = useSelector(
    (state) => state.player
  );
  const songName = activeSong?.title;
  const songSrc = getStrapiMediaURL(activeSong?.audio.url);
  const imgSrc = getStrapiMediaURL(activeSong?.img.url);
  const [volumeLevel, setVolumeLevel] = useState(0.5);
  const [showMusicPlayer, setShowMusicPlayer] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [durationProgress, setDurationProgress] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [isEnableLoop, setIsEnableLoop] = useState(false);
  const audioElementRef = useRef(null);

  useEffect(() => {
    if (audioElementRef.current.getReadyState() >= 3) {
      audioElementRef.current[isPlaying ? "play" : "pause"]();
    }
  }, [isPlaying]);
  useEffect(() => {
    audioElementRef.current.setCurrentTime(0);
    setDurationProgress(0);
    setAudioCurrentTime(0);
    audioElementRef.current.load();
  }, [activeSong]);
  const changeVolumeLevel = (vol) => {
    audioElementRef.current.setVolume(vol);
    setVolumeLevel(vol);
  };
  const moveToNextSong = () => {
    dispatch(nextSong());
    setShuffle(false);
  };
  const backToPrevSong = () => {
    dispatch(prevSong());
    setShuffle(false);
  };
  const toggleAudioPlayState = () => {
    dispatch(playPause(!isPlaying));
    setShuffle(false);
  };
  const toggleMusicPlayerVisibility = () => {
    setShowMusicPlayer((prev) => !prev);
  };
  const onShuffleClick = () => {
    if (currentSongs.length > 1) {
      dispatch(shuffleSong());
      setShuffle(true);
    }
  };
  const onAudioTimeUpdate = (e) => {
    setDurationProgress((e.target.currentTime / e.target.duration) * 100);
    setAudioCurrentTime(e.target.currentTime);
  };
  const toggleAudioLoop = () => {
    setIsEnableLoop((prev) => !prev);
  };
  const onAudioTimelineClick = (e) => {
    let timelineWidth = e.currentTarget.clientWidth;

    const relativeTimelineX = Math.abs(e.nativeEvent.offsetX / timelineWidth);
    // changes current time on the left
    const newAudioCurrentTime = relativeTimelineX * audioDuration;
    setAudioCurrentTime(newAudioCurrentTime);
    audioElementRef.current.setCurrentTime(newAudioCurrentTime);
    // update progress to the position the user clicked in the timeline
    setDurationProgress(relativeTimelineX * 100);
  };
  const onEmptied = () => {
    audioElementRef.current.play();
  };

  const setPlayerProgress = (e) => {
    let timelineWidth = e.currentTarget.clientWidth;
    const relativeTimelineX = Math.abs(e.offsetX / timelineWidth);
    const newAudioCurrentTime = relativeTimelineX * audioDuration;
    setAudioCurrentTime(newAudioCurrentTime);
    audioElementRef.current.setCurrentTime(newAudioCurrentTime);
    setDurationProgress(relativeTimelineX * 100);
  };
  return (
    <div
      dir="ltr"
      className={`bg-opacity-90 bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg fixed ${
        showMusicPlayer
          ? "animate-slideup bottom-0"
          : "animate-slidedown top-full"
      } w-full flex md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-0  p-3 rounded-t-[15px] z-10 flex-col`}
    >
      <span
        className="flex justify-center items-center absolute bottom-full rounded-t-sm bg-[#dfdfdf] w-[20px] h-[20px] right-10 cursor-pointer"
        onClick={toggleMusicPlayerVisibility}
      >
        {showMusicPlayer ? <FiArrowDown /> : <FiArrowUp />}
      </span>
      <Track isPlaying={isPlaying} imgSrc={imgSrc} title={songName} />
      <div className="flex flex-col self-stretch md:self-center gap-3 w-full md:w-[20%] items-center">
        <Controls
          isPlaying={isPlaying}
          shuffle={shuffle}
          loop={isEnableLoop}
          handlePlayPause={toggleAudioPlayState}
          handleNextSong={moveToNextSong}
          handlePrevSong={backToPrevSong}
          onShuffleClick={onShuffleClick}
          toggleLoop={toggleAudioLoop}
        />
        <Seekbar
          duration={audioDuration}
          seekbarProgress={durationProgress}
          audioCurrentTime={audioCurrentTime}
          onAudioTimelineClick={onAudioTimelineClick}
          setPlayerProgress={setPlayerProgress}
        />
      </div>
      <Volume volumeLevel={volumeLevel} setVolumeLevel={changeVolumeLevel} />
      <Player
        ref={audioElementRef}
        src={songSrc}
        isPlaying={isPlaying}
        loop={isEnableLoop}
        onEmptied={onEmptied}
        onLoadedData={(e) => setAudioDuration(e.target.duration)}
        onUpdateTime={onAudioTimeUpdate}
      />
    </div>
  );
};
export default MusicPlayer;
