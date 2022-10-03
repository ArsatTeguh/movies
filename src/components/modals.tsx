import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { details } from "./type";
import * as AiIcons from "react-icons/ai";

const containersAnimate = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};
const containersModal = {
  initial: { y: "-100vh", opacity: 0 },
  animate: { y: "0", opacity: 1, transition: { delay: 0.3 } },
};

const Modal = ({ modal, setModal, id }: any) => {
  const [data, setData] = useState<details | null>(null);
  const [rating, setRating] = useState<boolean | null>(true);

  const handle = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DETAIL}${id}${process.env.REACT_APP_T}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatings = async (id: number) => {
    try {
      if (rating === true) {
        await axios.post(
          `${process.env.REACT_APP_DETAIL}${id}/rating${process.env.REACT_APP_T}`,
          { value: 10.0 }
        );
        setRating(false)
        console.log("berhasil menambah rating");
      }

      if (rating === false) {
        await axios.delete(
          `${process.env.REACT_APP_DETAIL}${id}${process.env.REACT_APP_T}`
        );
        setRating(true)
        console.log("menghapus rating");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      handle();
    }
  }, [id]);

  return (
    <>
      <AnimatePresence>
        {modal && (
          <motion.div
            variants={containersAnimate}
            initial="initial"
            animate="animate"
            className="backdrop "
          >
            <motion.div
              key="midals"
              className="contentModal laptop:container laptop:mx-auto "
              variants={containersModal}
              initial="initial"
              animate="animate"
              exit={{ y: -100, opacity: 0 }}
            >
              <motion.div
                className="exit shadow-xl laptop:border-0 border-4 border-black "
                whileHover={{
                  scale: 1.2,
                }}
              >
                <span onClick={() => setModal(false)}>X</span>
              </motion.div>
              <div className="contents">
                <div className="content-layout  hp:h-58 laptop:h-68 flex items-center justify-between ">
                  <div className="info w-1/2 laptop:pl-10 hp:h-full py-2">
                    <h3 className="font-semibold text-orange-400 text-start laptop:text-6xl text-xl laptop:pb-5 pb-2 pt-5">
                      {data?.title}
                    </h3>
                    <p className="text-slate-300 over laptop:pb-8 text-justify laptop:text-start">
                      {data?.overview}
                    </p>
                    <div className="flex laptop:gap-1 gap-4 ">
                      <span className="text-yellow-500 populer laptop:pr-5 pr-1 font-semibold flex items-center align-center laptop:gap-2 gap-1">
                        <AiIcons.AiOutlineStar /> {data?.popularity}
                      </span>
                      <span
                        className="text-slate-50 vote border-2 px-2 hp:zIndex-10 border-yellow-500 rounded cursor-pointer hover:scale-110"
                        onClick={() => handleRatings(id)}
                      >
                        {data?.vote_average}
                      </span>
                    </div>
                  </div>
                  <div className="img-poster w-1/2 h-full laptop:h-full relative">
                    <img
                      className="w-full hp:h-56 rounded laptop:h-full "
                      src={`${process.env.REACT_APP_IMAGE}${data?.backdrop_path}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
