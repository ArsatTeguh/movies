import { Fragment, useEffect, useState } from "react";
import UseFetch from "./Hook/useFetch";
import { BounceLoader } from "react-spinners";
import {  Popular } from "./type";
import Populer from "./populer";
import Modal from "./modals";


export default function HomeContent() {
const [data, setData] = useState<Array<Popular> | null>(null)
const [modal, setModal] = useState(false)
const [id, setId] = useState<number>()



  const { dataFetch, loading } = UseFetch(
    `${process.env.REACT_APP_KEY}`
  );

  let datas = data?.slice(0, 10)

  const handleModals = (id : number) => {
    setId(id)
    setModal(true)
  }

  useEffect(() => {
   if(data !== undefined){
    setData(dataFetch)
   }
   
  },[dataFetch, data])

  return (
    <Fragment>
      <div className="list-movies laptop:py-5 ">
        <div className="">
          <h1 className="text-yellow-500 font-semibold laptop:text-3xl hp:text-xl ">Movies</h1>
        </div>
        <hr />
        {loading ? (
          <div className="loader-container flex justify-center py-10">
            <BounceLoader color={"#e32d20"} size={80} />
          </div>
        ) : (
          <div className="list pt-5 grid laptop:grid-rows-2 grid-rows-12 laptop:grid-flow-col grid-flow-col-1 laptop:gap-4 flex laptop:justify-between justify-center gap-5">
            {datas?.map((result, index) => {
              return (
                <div
                  className="py-2 cursor-pointer hover:scale-105 w-48 transition ease-in-out delay-50"
                  key={index}
                >
                  <div className="w-full">
                    <img
                    onClick={() => handleModals(result.id)}
                      src={`${process.env.REACT_APP_IMAGE}${result.poster_path}`}
                      alt=""
                    />
                  </div>
                  <div className="img w-full">
                    <p className="text-slate-50"> {result.title} </p>
                  </div>
                </div>
              );
            })}
              {modal && <Modal modal={modal} setModal={setModal} id={id} />}
          </div>
        )}

        <div className="mt-10 laptop:container mx-auto">
          <h1 className="text-yellow-500 font-semibold laptop:text-3xl text-xl ">Populer</h1>
        </div>
        <hr />
        {loading ? (
          <div className="loader-container flex justify-center py-20">
            <BounceLoader color={"#e32d20"} size={80} />
          </div>
        ) : (
          <Populer />
        )}  
        
      </div>
    </Fragment>
  );
}
