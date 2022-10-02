import { Fragment, useEffect, useState } from "react";
import HomeContent from "./homeContent";
import { dataTitle, Popular } from "./type";
import UseFetch from "../components/Hook/useFetch";
import * as AiIcons from "react-icons/ai";
import Layout from "./layout";

export default function Home() {
  const [toggleState, setTogleState] = useState<number>(1);
  const [data, setData] = useState<Array<Popular> | null>(null);

  const { dataFetch } = UseFetch(`${process.env.REACT_APP_KEY}`);

  useEffect(() => {
    setData(dataFetch); 
  }, [dataFetch]);

  return (
    <Fragment>
      <div className="layout bg-green  ">
        {data !== null && (
          <div className="content-layout flex items-center justify-between relative ">
            <div className="infos laptop:w-1/2 laptop:pl-10 hp:pl-4 ">
              <h3 className="font-semibold text-slate-50 laptop:text-6xl hp:text-4xl laptop:pb-5 hp:pb-5 laptop:pt-5 hp:pt-4">
                {data[1].title}
              </h3>
              <div className="txt-film laptop:pr-0 pr-5 laptop:pb-0 pb-5 text-justify laptop:text-start"><p className="text-slate-300 laptop:pb-5 ">{data[1].overview}</p></div>
              <div className="flex ">
                <span className="text-yellow-500 pr-5 font-semibold flex items-center align-center gap-2">
                  <AiIcons.AiOutlineStar /> {data[1].popularity}
                </span>
                <span className="text-slate-50 laptop:font-normal font-semibold border-2 laptop:px-2 px-3 flex justify-center items-center h-full  border-yellow-500 rounded ">
      
                  {data[1].vote_average}
                </span>
              </div>
            </div>
            <div className="img-poster poster laptop:w-1/2  relative  ">
              <img
                className="w-full "
                src={`${process.env.REACT_APP_IMAGE}${data[1].backdrop_path}`}
                alt=""
              />
            </div>
          </div>
        )}
      </div>

      <div className="datalist laptop:container laptop:mx-auto">
        <div className="bloc-tabs hp:mt-2">
          {dataTitle?.map((data, index) => (
            <button
              className={toggleState === data.id ? "tabs active-tabs" : "tabs"}
              onClick={() => setTogleState(data.id)}
              key={index}
            >
              <div className="title flex justify-center gap-3">
                {data.title}
                {!data.status ? (
                  <p></p>
                ) : (
                  <p className="px-3 bg-red-600 rounded text-slate-50 ">
                    {data.status}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="content-tabs ">
          <div
            className={
              toggleState === 1 ? "content  active-content mt-4" : "content"
            }
          >
            <HomeContent />
          </div>
          <div
            className={
              toggleState === 2 ? "content  active-content mt-4" : "content"
            }
          >
          <div className="">
          <Layout />
          </div>
          </div>
         
        </div>
      </div>
    </Fragment>
  );
}
