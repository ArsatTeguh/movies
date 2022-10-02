import { Fragment } from "react";


export default function Navbar() {
  return (
    <Fragment>
      <div className="laptop:flex hidden relative z-10 ">
        <div className="absolute py-5  px-10">
          <div className="container w-full  mx-auto">
            <div className="img w-40 ">
            <a href="https://arsatteguh.github.io/netflix/">
            <img
                className="w-full"
                src="https://raw.githubusercontent.com/ArsatTeguh/netflix/master/src/Component/Util/logo.png"
                alt=""
              />
            </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
