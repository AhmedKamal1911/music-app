import { Link } from "react-router-dom";
import {
  CardSkeletonLoader,
  Loading,
  MusicContentHandler,
  TopChartCard,
} from ".";
import { useGetMusicQuery } from "@/redux/services/musicApi";
import useMusicPlayerActions from "@/hooks/useMusicPlayerActions";
import { useSelector } from "react-redux";
import { useMemo } from "react";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const activeSongId = activeSong?.id;
  const { togglePlayClick } = useMusicPlayerActions();
  const { data, error, isFetching, isLoading } = useGetMusicQuery({
    genre: "popular",
  });
  const topMusicData = data?.data;

  const topSongs = useMemo(() => topMusicData?.slice(0, 5), [topMusicData]);

  return (
    <div className="lg:sticky top-[60px] lg:self-start  lg:min-w-[350px]">
      <div className="flex flex-row gap-5 justify-between my-3">
        <h3 className="text-white font-bold text-lg">الأكثر استماعاً</h3>
        <Link className="text-white font-bold" to={"/top-charts"}>
          المزيد
        </Link>
      </div>
      <div className="flex flex-col gap-5 max-h-[770px] overflow-y-auto py-3 pl-1 top-charts">
        <Loading
          isLoading={isLoading}
          error={error}
          loadingElement={<CardSkeletonLoader />}
        >
          <MusicContentHandler
            list={topSongs}
            noResultElement={
              <p className="text-yellow-300 font-bold text-2xl text-center">
                No result
              </p>
            }
            renderItem={(song, i) => {
              const isSelectedSong = activeSongId === song.id;
              return (
                <TopChartCard
                  togglePlayClick={togglePlayClick}
                  isPlaying={isSelectedSong && isPlaying}
                  isSelected={isSelectedSong}
                  i={i}
                  song={song}
                  key={song.id}
                  topSongs={topSongs}
                />
              );
            }}
          />
        </Loading>
      </div>
    </div>
  );
};

export default TopCharts;
