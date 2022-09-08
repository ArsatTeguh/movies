import React, { useState, useEffect } from "react";
import UseFetch from "./Hook/useFetch";
import { BounceLoader } from "react-spinners";
import { Popular } from "./type";
import axios from 'axios'
import Modal from "./modals";

export default function Layout() {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<Array<Popular>  | null>(null)
  const [loadings, setLoadings] = useState(false)
  const [modal, setModal] = useState(false)
  const [id, setId] = useState<number>()

  const { dataFetch, loading} = UseFetch(
    `${process.env.REACT_APP_FIND}'a`
  );

  const handleSearch = async (Event: any) => {
    Event.preventDefault()
    try {
      setLoadings(true);
      const response = await axios.get(`${process.env.REACT_APP_FIND}${search}`);
      setData(response.data.results);
      setLoadings(false)
      setSearch('')
    } catch (error) {
      setLoadings(true)
      console.log(error);
      setLoadings(false)
    }
  };

  const handleModals = (id : number) => {
    setId(id)
    setModal(true)
  }

  useEffect(() => {
    setData(dataFetch)
    setLoadings(loading)
  },[dataFetch, loading])

  return (
    <React.Fragment>
      <div className="layout ">
        <div className="content-layout container mx-auto">
          <label
            className="laptop:flex justify-center laptop:py-10  laptop:text-4xl text-xl font-semibold text-slate-50"
            htmlFor=""
          >
            Movies
          </label>
          <form className="flex laptop:gap-5 gap-2  py-5  justify-center ">
            <input
              className="laptop:w-1/3 focus:outline-none focus:ring focus:ring-green-500 rounded px-2 "
              type="text"
              onChange={(Event) => setSearch(Event.target.value)}
              value={search}
              placeholder= 'Search Movies..'
            />
            <input
              className="text-green cursor-pointer hover:scale-105 hover:font-semibold
                    text-slate-50 bg-tombol px-6 py-1 rounded "
              type="submit"
              value="Find"
              onClick={(Event) => handleSearch(Event)}
            />
          </form>
        </div>
        {/* LIST*/}
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
