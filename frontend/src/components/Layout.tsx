import React from "react";
import { useResolvedPath } from "react-router";
import { Navbar } from "./Navbar";
export const Layout = () => {
  //  const path = useResolvedPath("");
  //  console.log(path);
  return (
    <div className="fixed w-full ">
      <Navbar />
    </div>
  );
};
