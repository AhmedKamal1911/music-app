import { Aside, Searchbar, TopCharts } from "@/components";
import MusicPlayerManager from "@/components/MusicPlayerManager";
import useMediaQuery from "@/hooks/useMediaQuery";
import useScrollToTop from "@/hooks/useScrollTop";
import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  useScrollToTop();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  return (
    <>
      <div className="flex min-h-full">
        {isLargeScreen && <Aside />}
        <div className="flex flex-1 flex-col bg-gradient-to-br from-black to-[#121286]">
          <Searchbar />
          <div className="px-6 py-4 flex lg:flex-row flex-col-reverse gap-5 flex-1">
            <div className="flex flex-1 overflow-hidden">
              <Outlet />
            </div>
            <TopCharts />
          </div>
        </div>
      </div>
      <MusicPlayerManager />
    </>
  );
};

export default RootLayout;
