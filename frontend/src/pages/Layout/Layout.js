import { Outlet } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer';

function Layout() {
  return (
    <div className="layout">
      <Navbar />

        <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;