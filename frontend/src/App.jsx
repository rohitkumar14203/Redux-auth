import { ToastContainer } from "react-toastify";
import Header from "./components/Header";

import { Outlet } from "react-router";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className="my-2">
        <Outlet />
      </main>
    </>
  );
};

export default App;
