import {
  EmptyResultText,
  Loading,
  MusicContentHandler,
  MusicLoader,
  PaginationLoader,
  SongCard,
} from "@/components";
import useMusicPagination from "@/hooks/useMusicPagination";
import useMusicPlayerActions from "@/hooks/useMusicPlayerActions";
import { useGetMusicQuery } from "@/redux/services/musicApi";
import { useState } from "react";
import { useSelector } from "react-redux";

const TopChartsPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isFetching, isLoading } = useGetMusicQuery({
    genre: "popular",
    page,
  });
  const lastPage = data?.meta?.pagination?.pageCount;
  const topSongs = data?.data;

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const activeSongId = activeSong?.id;
  const { togglePlayClick } = useMusicPlayerActions();

  const refCallback = useMusicPagination(isFetching, lastPage, setPage, page);

  return (
    <>
      <Loading
        error={error}
        isLoading={isLoading}
        loadingElement={<MusicLoader />}
      >
        <div className="flex flex-col h-full w-full">
          <h2 className="font-bold text-3xl mt-4 text-white text-center">
            الأكثر استماعاً
          </h2>

          <MusicContentHandler
            list={topSongs}
            noResultElement={<EmptyResultText />}
            itemsWrapperProps={{
              className:
                "grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 justify-center",
              dir: "ltr",
            }}
            renderItem={(song, i) => {
              const isSelectedSong = activeSongId === song.id;

              return (
                <SongCard
                  ref={i + 1 === topSongs.length ? refCallback : undefined}
                  togglePlayClick={togglePlayClick}
                  isPlaying={isSelectedSong && isPlaying} // true only if this is the active song
                  isSelected={isSelectedSong} //mount ==> all is false, false
                  key={song.id}
                  data={topSongs}
                  imgSrc={song.img.url}
                  i={i}
                  song={song}
                />
              );
            }}
          />
        </div>
      </Loading>
      {isFetching && !isLoading && (
        <div className="bg-[#08153aea] rounded-lg z-[999] fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[200px] h-[200px]">
          <PaginationLoader />
        </div>
      )}
    </>
  );
};

export default TopChartsPage;
