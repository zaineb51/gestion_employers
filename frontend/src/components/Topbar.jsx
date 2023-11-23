import React from "react";

//importé le Link depuis react-router-dom
import { Link } from "react-router-dom";

//composant pour la page topbar
const Topbar = () => {
  return (
    <div>
      <header className="app-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item d-block d-xl-none">
                
              {/*on utilise le composant Link du react-router-dom pour créer les liens vers différentes routes */}
              <Link
                className="nav-link sidebartoggler nav-icon-hover"
                id="headerCollapse"
                to=""
              >
                <i className="ti ti-menu-2" />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link nav-icon-hover"
                
              >
                <i className="ti ti-bell-ringing" />
                <div className="notification bg-primary rounded-circle" />
              </Link>
            </li>
          </ul>
          <div
            className="navbar-collapse justify-content-end px-0"
            id="navbarNav"
          >
            <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              <Link
                target="_blank"
                className="btn btn-primary"
              >
                Déconnexion
              </Link>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link nav-icon-hover"
                  to=""
                  id="drop2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="../assets/images/profile/user-1.jpg"
                    alt=""
                    width={35}
                    height={35}
                    className="rounded-circle"
                  />
                </Link>
                <div
                  className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                  aria-labelledby="drop2"
                >
                  <div className="message-body">
                    <Link
                      to=""
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-user fs-6" />
                      <p className="mb-0 fs-3">My Profile</p>
                    </Link>
                    <Link
                      to=""
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-mail fs-6" />
                      <p className="mb-0 fs-3">My Account</p>
                    </Link>
                    <Link
                      to=""
                      className="d-flex align-items-center gap-2 dropdown-item"
                    >
                      <i className="ti ti-list-check fs-6" />
                      <p className="mb-0 fs-3">My Task</p>
                    </Link>
                    <Link
                      to=""
                      className="btn btn-outline-primary mx-3 mt-2 d-block"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Topbar;
