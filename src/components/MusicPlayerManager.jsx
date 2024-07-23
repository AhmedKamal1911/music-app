import { useSelector } from "react-redux";
import { MusicPlayer } from ".";

const MusicPlayerManager = () => {
  const activeSong = useSelector((state) => state.player.activeSong);
  return activeSong && <MusicPlayer />;
};

export default MusicPlayerManager;
