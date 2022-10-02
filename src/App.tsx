import React, { Fragment, Suspense } from "react";
import "./App.css";
import LoadingPage from "./components/loadingPage";
import Navbar from "./components/navbar";
import NavMobile from "./components/navbarMobile";
const Home = React.lazy(() => import("./components/home"));

function App() {
  return (
    <Fragment>
      <Suspense
        fallback={
          <LoadingPage />
        }
      >
        <NavMobile>
          <Navbar />

          <Home />
        </NavMobile>
      </Suspense>
    </Fragment>
  );
}

export default App;
