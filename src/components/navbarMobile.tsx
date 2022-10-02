import { Fragment, ReactNode } from "react";

import * as BsIcons from "react-icons/bs";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as GoIcons from "react-icons/go";


<BsIcons.BsBox />;

type navMobile = {
  children: ReactNode;
};

function NavMobile({ children }: navMobile) {
  return (
    <Fragment>
      <div className="mobile ">
        <div className="nav fixed bottom-0 z-20 block laptop:hidden ">
          <div className="icons w-screen h-10 nav-mobile flex justify-between items-center px-4 ">
            <div className="w-[3rem] h-[3rem] flex items-center justify-center cursor-pointer ">
              <span className="text-1xl text-center text-slate-800 hover:scale-105 transition-all delay-75">
              <FaIcons.FaUserAlt /> 
              </span>
            </div>
            <div className="w-[3rem] h-[3rem]  flex items-center justify-center cursor-pointer ">
              <span className="text-2xl text-center text-slate-800 hover:scale-105 transition-all delay-75">
                <MdIcons.MdFilterListAlt />
              </span>
            </div>

            <a href="https://arsatteguh.github.io/netflix/">
            <div className="w-[4rem] h-[4rem] user mb-5  bg-tombol rounded-full flex items-center justify-center border-2 shadow-green-500 cursor-pointer ">
              <span className="text-2xl text-center text-slate-50 hover:scale-105 transition-all delay-75">
                 <AiIcons.AiFillHome />
              </span>
            </div>
            </a>

            <div className="w-[3rem] h-[3rem]  flex items-center justify-center cursor-pointer  ">
              <span className="text-2xl text-center text-slate-800 hover:scale-105 transition-all delay-75">
                <GoIcons.GoListOrdered />
              </span>
            </div>
            <div className="w-[3rem] h-[3rem]   flex items-center justify-center cursor-pointer  ">
              <span className="text-2xl text-center text-slate-800 hover:scale-105 transition-all delay-75">
                <AiIcons.AiFillInfoCircle />
              </span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </Fragment>
  );
}

export default NavMobile;
