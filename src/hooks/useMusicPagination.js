import { useCallback, useRef } from "react";
const useMusicPagination = (musicIsFetching, lastPage, setPage, page) => {
  const observerRef = useRef();
  const refCallback = useCallback(
    (lastSongCardElement) => {
      if (musicIsFetching) return;
      if (!lastSongCardElement) {
        // clean up
        observerRef.current?.disconnect();
        return;
      }
      // there is lastsongcardeleent
      if (observerRef.current) {
        observerRef.current?.disconnect();
      }

      observerRef.current = new IntersectionObserver(onIntersect);

      observerRef.current.observe(lastSongCardElement);
      function onIntersect(entries, observer) {
        const [observerEntry] = entries;
        const isLastPage = page === lastPage;
        // console.log(observerEntry, "entries");
        if (observerEntry.isIntersecting && !musicIsFetching && !isLastPage) {
          // logic when the element is in the viewport
          setPage((prevPage) => prevPage + 1);
        } else if (isLastPage) {
          observer.disconnect();
        }

        // when "lastSongCardElement" intersects increase page number
      }
    },
    [musicIsFetching, lastPage]
  );
  return refCallback;
};
export default useMusicPagination;
