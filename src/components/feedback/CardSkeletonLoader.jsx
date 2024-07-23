const CardSkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="border border-blue-300 shadow rounded-md p-4 lg:w-[300px]"
        >
          <div className="animate-pulse flex">
            <div className="flex flex-1 flex-col gap-4 ">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
            <div className=" bg-slate-700 h-10 w-10 mr-2 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeletonLoader;
