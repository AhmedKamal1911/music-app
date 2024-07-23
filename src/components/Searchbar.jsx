import React from "react";
import { FiSearch } from "react-icons/fi";
import AsideMobileDrawer from "./AsideMobileDrawer";
import useMediaQuery from "@/hooks/useMediaQuery";

const Searchbar = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <div
      dir="ltr"
      className="sticky bg-[#120e1891] backdrop-blur-lg top-0 z-[10] flex justify-between md:justify-end px-2"
    >
      {isMobile && <AsideMobileDrawer />}

      <form dir="rtl" autoComplete="off" className="p-2 text-gray-400">
        <label htmlFor="search-field" className="sr-only">
          Search all songs
        </label>
        <div className="flex flex-row justify-start items-center border-[1px] border-gray-700 rounded-lg w-fit p-1">
          <FiSearch className="w-5 h-5" />
          <input
            autoComplete="off"
            type="search"
            name="search-field"
            id="search-field"
            placeholder="Search"
            className="bg-transparent outline-none placeholder-gray-500 text-base text-white p-2 min-w-[200px] "
          />
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
