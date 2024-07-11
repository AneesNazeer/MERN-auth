import React from "react";
import { Error } from "master";
import { Route, Routes } from "react-router-dom";
import { DashBoard } from "modules";

export const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};
