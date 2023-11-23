import React from "react";

//importé le Link depuis react-router-dom
import { Link } from "react-router-dom";

//composant pour la page sidebar
const Sidebar = () => {
  return (
    <div>
      <nav className="sidebar-nav scroll-sidebar" data-simplebar>
        <ul id="sidebarnav">
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4" />
            <span className="hide-menu">Accueil</span>
          </li>
          <li className="sidebar-item">
            <Link
              className="sidebar-link"
              to="./index.html"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-layout-dashboard" />
              </span>
              <span className="hide-menu">Statistique</span>
            </Link>
          </li>
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4" />
            <span className="hide-menu">Employés</span>
          </li>

          <li className="sidebar-item">
            {/*on utilise le composant Link du react-router-dom pour créer les liens vers différentes routes */}
            <Link
              className="sidebar-link"
              to="/employees"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Liste Des Employés</span>
            </Link>
          </li>
          <li className="nav-small-cap">
            <i className="ti ti-dots nav-small-cap-icon fs-4" />
            <span className="hide-menu">Départements</span>
          </li>

          <li className="sidebar-item">
            {/*on utilise le composant Link du react-router-dom pour créer les liens vers différentes routes */}
            <Link
              className="sidebar-link"
              to="/departments"
              aria-expanded="false"
            >
              <span>
                <i className="ti ti-file-description" />
              </span>
              <span className="hide-menu">Liste Des Départements</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
