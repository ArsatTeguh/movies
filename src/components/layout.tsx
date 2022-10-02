import React, { useState, useEffect } from "react";
import UseFetch from "./Hook/useFetch";
import { BounceLoader } from "react-spinners";
import { Popular } from "./type";
import Modal from "./modals";
import { AsyncPaginate } from "react-select-async-paginate";
import { loadOptions } from "./Hook/useSelect";

export default function Layout() {
  const [data, setData] = useState<Array<Popular> | null>(null);
  const [loadings, setLoadings] = useState(false);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState<number>();
  const [value, setValue] = useState<Popular | null>(null);

  const { dataFetch, loading } = UseFetch(`${process.env.REACT_APP_FIND}'a`);

  const handleInput = (search: any) => {
    setValue(search.values);
  };

  const handleModals = (id: number) => {
    setId(id);
    setModal(true);
  };

  useEffect(() => {
    setData(dataFetch);
    setLoadings(loading);
  }, [dataFetch, loading]);

  return (
    <React.Fragment>
      <div className="layout ">
        <div className="contents-layout flex flex-col container mx-auto laptop:px-10">
          <label
            className="laptop:flex justify-end laptop:py-10 laptop:pb-5 pb-3  laptop:text-4xl text-xl font-semibold text-slate-50"
            htmlFor=""
          >
            Movies
          </label>

          <div className="">
            <AsyncPaginate
              value={value}
              loadOptions={loadOptions}
              onChange={handleInput}
              debounceTimeout={600}
              placeholder="Search Movies"
            />
          </div>
        </div>
        {/* LIST*/}
        <div className="">
          {value && (
            <div className="text-slate-50 w-full flex justify-center laptop:pt-10 pt-5 ">
              <div className="py-2 cursor-pointer hover:scale-105 w-60 transition ease-in-out delay-50 border-2 border-orange-500 px-2 rounded">
                <div className="w-full laptop:pb-3">
                  <img
                    onClick={() => handleModals(value.id)}
                    src={`${process.env.REACT_APP_IMAGE}${value.poster_path}`}
                    alt=""
                  />
                </div>
                <div className="">
                  <p className="text-slate-50 text-xl text-center font-semibold text-orange-400">

                    {value.title}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="container mx-auto px-10">
          <div className="list-movies py-10 ">
            {loadings ? (
              <div className="loader-container flex justify-center py-20">
                <BounceLoader color={"#e32d20"} size={80} />
              </div>
            ) : (
              <div className="list pt-5 grid laptop:grid-rows-4 laptop:grid-flow-col gap-4 flex laptop:justify-between justify-center laptop:gap-10 gap-2 ">
                {data?.map((result, index) => {
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
              </div>
            )}
          </div>
          {modal && <Modal modal={modal} setModal={setModal} id={id} />}
        </div>
        <Modal />
      </div>
    </React.Fragment>
  );
}
