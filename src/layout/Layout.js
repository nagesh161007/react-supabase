import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "./Layout.css";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <div className="app-container">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
