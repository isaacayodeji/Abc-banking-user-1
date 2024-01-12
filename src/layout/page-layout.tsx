import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { useEffect, useLayoutEffect } from "react";

const PageLayout = () => {

  useEffect(() => {
    if (!localStorage.getItem("****")) {
      return window.history.back()
    }
    
  },[]);

  return (
    <div className="h-screen grid grid-rows-[4rem_1fr]">
      <Topbar />
      <main className="grid grid-cols-1 lg:grid-cols-[13.5rem_1fr] overflow-auto">
        <Sidebar />
        <section className="px-3 md:px-10 bg-[#ffffff] overflow-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};
export default PageLayout;
