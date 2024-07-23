import { NavLink, useNavigate } from "react-router-dom";

import { logo } from "@/assets";
import { links } from "@/data";
import { twMerge } from "tailwind-merge";
import { useTransition } from "react";

const Aside = ({ className }) => {
  const [isPending, startTransition] = useTransition();

  const navigate = useNavigate();
  return (
    <>
      <div
        className={twMerge(
          "md:z-[10] z-[50] sticky bg-[#151c41c9] bg-opacity-75 backdrop-blur-lg  top-0 w-[200px] h-screen items-start p-4 md:bg-[#191624] smooth-transition",
          className
        )}
      >
        <NavLink className="w-fit block m-auto" to="/">
          <img src={logo} alt="logo-img" className="h-14 object-contain" />
        </NavLink>
        <div className="flex flex-col gap-4 mt-10">
          {links.map((item) => (
            <NavLink
              end
              className="text-lg font-medium text-gray-400 hover:text-cyan-400 flex items-center"
              key={item.name}
              to={item.to}
              onClick={(e) => {
                e.preventDefault();
                startTransition(() => {
                  navigate(item.to);
                });
              }}
            >
              <item.icon className="w-6 h-6 ml-2" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Aside;
