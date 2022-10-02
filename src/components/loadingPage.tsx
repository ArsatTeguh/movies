import { Fragment } from "react";



export default function LoadingPage(){
  return (
    <Fragment>
        <div className="w-screen h-screen container mx-auto flex justify-center items-center">
            <div className="laptop:w-48">
            <img
                className="w-full"
                src="https://raw.githubusercontent.com/ArsatTeguh/netflix/master/src/Component/Util/logo.png"
                alt=""
              />
            </div>
        </div>
    </Fragment>
  )
}
