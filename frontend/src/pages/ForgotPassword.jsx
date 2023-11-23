

import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <>
   <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
  <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xxl-3">
          <div className="card mb-0">
            <div className="card-body">
              <p className="text-center fs-5" >Mot de passe oublié ? 🔒</p>
              <p className="text-center fs-12">Saisissez votre courriel et nous vous enverrons les instructions pour réinitialiser votre mot de passe.</p>
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <button className="btn btn-info w-100 mb-4 ">Envoyer le Lien de Réinitialisation</button>
                <div className="d-flex align-items-center justify-content-center">
                  <Link className="text-primary fw-bold ms-2" to="/login">Retour à la connexion</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default ForgotPassword;
