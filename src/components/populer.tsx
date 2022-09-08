import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import UseFetch from "./Hook/useFetch";
import { Popular } from "./type";
import { BounceLoader } from "react-spinners";
import Modal from "./modals";

export default function Populer() {
  const [position, positionSet] = useState(0);
  const [data, setData] = useState<Array<Popular> | null>(null);
  const [modal, setModal] = useState(false)
  const [id, setId] = useState<number>()

  const { dataFetch, loading } = UseFetch(
    `${process.env.REACT_APP_KEY}`
  );

  const handleRight = () => {
    if (data) {
      if (position < data?.length - 1) {
        positionSet(position + 1);
      }
      if (position === data?.length - 1 - 3) {
        positionSet(position);
      }
    }
  };

  const handleLeft = () => {
    if (position > 0) {
      positionSet(position - 1);
    }
  };

  const handleModals = (id : number) => {
    setId(id)
    setModal(true)
  }

  useEffect(() => {
    setData(dataFetch);
  }, [dataFetch]);

  return (
    <Fragment>
      <div className="slider">
        {loading ? (
          <div className="loader-container flex justify-center py-20">
            <BounceLoader color={"#e32d20"} size={80} />
          </div>
        ) : (
          <div className="content-slider realative ">
            <div className=" laptop:container mx-auto list-slider mt-5 py-2">
              <motion.div className="App">
                <div className="navigation flex gap-5">
                  <button
                    className="laptop:px-4 px-1 bg-yellow-600 text-slate-50 font-semibold rounded shadow-xl hover:scale-105 transition ease-in-out delay-105 "
                    onClick={handleLeft}
                  >
                    &lt;&lt;
                  </button>
                  <button
                    className="laptop:px-4 px-1 bg-yellow-600 text-slate-50 font-semibold rounded shadow-xl hover:scale-105 transition ease-in-out delay-105"
                    onClick={handleRight}
                  >
                    &gt;&gt;
                  </button>
                </div>
                <div className="row">
                  {data?.map((url, index) => (
                    <motion.div
                      className="containers cursor-pointer "
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{
                        rotate: 0,
                        left: `${(index - position) * 20 - 43}vw`,

                        scale: index === position ? 1 : 0.9,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                    >
                      <img
                        className="hover:scale-110 transition ease-in-out delay-50"
                        onClick={() => handleModals(url.id)}
                        src={`${process.env.REACT_APP_IMAGE}${url.poster_path}`}
                        alt=""
                      />
                    </motion.div>
                  ))}
                   
                </div>
              </motion.div>
            
            </div>
          </div>
        )}
         {modal && <Modal modal={modal} setModal={setModal} id={id} />}
      </div>
    </Fragment>
  );
}
