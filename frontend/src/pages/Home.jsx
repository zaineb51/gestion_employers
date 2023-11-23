import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
//import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { Link, Outlet } from 'react-router-dom';

//composant pour la page Home
const Home = () => {
    return (
       <>
{/*  Body Wrapper */}
<div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
  {/* Sidebar Start */}
  <aside className="left-sidebar">
    {/* Sidebar scroll*/}
    <div>
      <div className="brand-logo d-flex align-items-center justify-content-between">
        <Link to="/" className="text-nowrap logo-img">
          <h5>Gestion des employés</h5>
        </Link>
        <div className="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
          <i className="ti ti-x fs-8" />
        </div>
      </div>
      {/* Sidebar navigation*/}
      <Sidebar></Sidebar>
      {/* End Sidebar navigation */}
    </div>
    {/* End Sidebar scroll*/}
  </aside>
  {/*  Sidebar End */}
  {/*  Main wrapper */}
  <div className="body-wrapper">
    {/*  Header Start */}
    <Topbar></Topbar>
    {/*  Header End */}
    <div className="container-fluid">
      {/*  Row 1 */}
    <Outlet></Outlet>
    {/* <Layout></Layout> */}
     <Footer></Footer>
    </div>
  </div>
</div>

</>
);
}

export default Home;
