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

import {
  useGetMusicGenresQuery,
  useGetMusicQuery,
} from "@/redux/services/musicApi";
import { useState } from "react";
import { useSelector } from "react-redux";

const Discover = () => {
  const [genreType, setGenreType] = useState("local");
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { togglePlayClick } = useMusicPlayerActions();
  const [page, setPage] = useState(1);

  const {
    data: musicData,
    error: musicError,
    isFetching: musicIsFetching,
    isLoading,
  } = useGetMusicQuery({ genre: genreType, page });

  const activeSongId = activeSong?.id;
  const lastPage = musicData?.meta?.pagination?.pageCount;
  const refCallback = useMusicPagination(
    musicIsFetching,
    lastPage,
    setPage,
    page
  );

  const filterdMusicsData = musicData?.data;

  const {
    data: genresData,
    // error: genresError,
    // isFetching: genresIsFetching,
  } = useGetMusicGenresQuery();

  const genres = genresData?.data;

  const handleChangeGenre = (e) => {
    setGenreType(e.target.value);
    setPage(1);
  };

  return (
    <>
      <Loading
        error={musicError}
        isLoading={isLoading}
        loadingElement={<MusicLoader />}
      >
        <div className="flex flex-col flex-1">
          <div
            dir="rtl"
            className="flex sm:flex-row justify-between px-5 mt-4 flex-col items-center"
          >
            <h2 className="font-bold text-3xl text-white">اعمالي</h2>
            <select
              onChange={handleChangeGenre}
              value={genreType}
              className="border-none outline-none text-sm mt-4 sm:mt-0 text-gray-300 bg-black p-3 rounded-lg"
            >
              {genres
                ?.filter(({ value }) => value !== "popular")
                .map(({ label, value, id }) => (
                  <option value={value} key={id}>
                    {label}
                  </option>
                ))}
            </select>
          </div>
          <MusicContentHandler
            list={filterdMusicsData}
            itemsWrapperProps={{
              className:
                "grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 justify-center",
              dir: "ltr",
            }}
            noResultElement={<EmptyResultText />}
            renderItem={(song, i) => {
              const isSelectedSong = activeSongId === song.id;

              return (
                <SongCard
                  ref={
                    i + 1 === filterdMusicsData.length ? refCallback : undefined
                  }
                  togglePlayClick={togglePlayClick}
                  isPlaying={isSelectedSong && isPlaying} // true only if this is the active song
                  isSelected={isSelectedSong} //mount ==> all is false, false
                  key={song.id}
                  data={filterdMusicsData}
                  imgSrc={song.img.url}
                  i={i}
                  song={song}
                />
              );
            }}
          />
        </div>
      </Loading>
      {musicIsFetching && !isLoading && (
        <div className="bg-[#08153aea] rounded-lg z-[999] fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[200px] h-[200px]">
          <PaginationLoader />
        </div>
      )}
    </>
  );
};

export default Discover;
