import React from "react";
import { Route, Routes } from "react-router-dom";
import Mainlayout from "../components/layout/Mainlayout";
import Home from "../pages/Home";
import FeaturedProduct from "../components/sections/FeaturedProduct";

export default function Mainrouter() {
  return (
    <Routes>
      <Route element={<Mainlayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/featured" element={<FeaturedProduct />} />
      </Route>
    </Routes>
  );
}
