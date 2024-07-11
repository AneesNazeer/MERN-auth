import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashBoardList } from ".";

export const DashBoard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoardList />} />
    </Routes>
  );
};
