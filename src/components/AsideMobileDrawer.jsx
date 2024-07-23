import { useState } from "react";
import Aside from "./Aside";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import { createPortal } from "react-dom";

const AsideMobileDrawer = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const toggleMobileMenuDrawerVisiblity = () => {
    setOpenSideMenu((prev) => !prev);
  };
  return (
    <>
      <button
        onClick={() => toggleMobileMenuDrawerVisiblity()}
        className="text-white cursor-pointer "
      >
        {openSideMenu ? (
          <RiCloseLine className="w-7 h-7" />
        ) : (
          <HiOutlineMenu className="w-7 h-7" />
        )}
      </button>
      {createPortal(
        <div
          className={`fixed h-screen w-full z-[999] inset-0 smooth-transition ${
            openSideMenu ? "right-0" : "-right-full"
          }`}
        >
          <Aside className={`fixed`} />
          <div
            className="absolute right-[200px] top-0 bottom-0 w-[calc(100%-200px)] bg-[#4c2dda69] backdrop-blur-sm"
            onClick={() => toggleMobileMenuDrawerVisiblity()}
          />
        </div>,
        document.getElementById("root")
      )}
    </>
  );
};

export default AsideMobileDrawer;
