import { useDispatch, useSelector } from "react-redux";
import { setActiveSong, playPause } from "@/redux/features/playerSlice";
import { useCallback, useEffect, useRef, useState } from "react";
const useMusicPlayerActions = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const activeSongId = activeSong?.id;
  const isPlayingRef = useRef(isPlaying);
  const activeSongIdRef = useRef(activeSongId);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
    activeSongIdRef.current = activeSongId;
  }, [isPlaying, activeSongId]);
  const togglePlayClick = useCallback((songIdx, song, data) => {
    if (song.id !== activeSongIdRef.current) {
      dispatch(setActiveSong({ song, data, i: songIdx }));
      dispatch(playPause(true));
    } else {
      dispatch(playPause(!isPlayingRef.current));
    }
  }, []);
  return { togglePlayClick };
};
export default useMusicPlayerActions;
