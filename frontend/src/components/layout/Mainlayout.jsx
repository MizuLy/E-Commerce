import { Outlet } from "react-router-dom";
import Nav from "../Nav";

export default function Mainlayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
