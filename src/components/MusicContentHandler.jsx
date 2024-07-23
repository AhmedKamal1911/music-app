const MusicContentHandler = ({
  list,
  noResultElement,
  renderItem,
  itemsWrapperProps,
}) => {
  return !list?.length ? (
    noResultElement
  ) : (
    <div {...itemsWrapperProps}>
      {list?.map((song, index) => renderItem(song, index))}
    </div>
  );
};

export default MusicContentHandler;
