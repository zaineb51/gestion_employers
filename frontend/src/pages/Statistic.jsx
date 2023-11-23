import React from "react";
import { Link } from "react-router-dom";
//import React, { useState, useEffect } from 'react';


const Statistic = () => {
    // const Statistic = ({ employees }) => {
    //     const [maleCount, setMaleCount] = useState(0);
    //     const [femaleCount, setFemaleCount] = useState(0);
      
    //     useEffect(() => {
    //       // Mettre à jour les statistiques lorsque la liste des employés change
    //       updateStatistics();
    //     }, [employees]);
      
    //     const updateStatistics = () => {
    //       // Réinitialiser les compteurs
    //       setMaleCount(0);
    //       setFemaleCount(0);
      
    //       // Parcourir la liste des employés
    //       employees.forEach(employee => {
    //         // Vérifier le genre de l'employé
    //         if (employee.gender === 'male') {
    //           setMaleCount(prevCount => prevCount + 1);
    //         } else if (employee.gender === 'female') {
    //           setFemaleCount(prevCount => prevCount + 1);
    //         }
    //         // Vous pouvez ajouter d'autres conditions pour d'autres genres si nécessaire
    //       });
    //     };
  return (
    <>
    <div className="row">
  <div className="col-lg-8 d-flex align-items-strech">
    <div className="card w-100">
      <div className="card-body">
        <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
          <div className="mb-3 mb-sm-0">
            <h5 className="card-title fw-semibold">Sales Overview</h5>
          </div>
          <div>
            <select className="form-select">
              <option value={1}>March 2023</option>
              <option value={2}>April 2023</option>
              <option value={3}>May 2023</option>
              <option value={4}>June 2023</option>
            </select>
          </div>
        </div>
        <div id="chart" />
      </div>
    </div>
  </div>
  <div className="col-lg-4">
    <div className="row">
      <div className="col-lg-12">
        {/* Yearly Breakup */}
        <div className="card overflow-hidden">
          <div className="card-body p-4">
            <h5 className="card-title mb-9 fw-semibold">Yearly Breakup</h5>
            <div className="row align-items-center">
              <div className="col-8">
                <h4 className="fw-semibold mb-3">$36,358</h4>
                <div className="d-flex align-items-center mb-3">
                  <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                    <i className="ti ti-arrow-up-left text-success" />
                  </span>
                  <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                  <p className="fs-3 mb-0">last year</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-4">
                    <span className="round-8 bg-primary rounded-circle me-2 d-inline-block" />
                    <span className="fs-2">2023</span>
                  </div>
                  <div>
                    <span className="round-8 bg-light-primary rounded-circle me-2 d-inline-block" />
                    <span className="fs-2">2023</span>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-center">
                  <div id="breakup" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12">
        {/* Monthly Earnings */}
        <div className="card">
          <div className="card-body">
            <div className="row alig n-items-start">
              <div className="col-8">
                <h5 className="card-title mb-9 fw-semibold"> Monthly Earnings </h5>
                <h4 className="fw-semibold mb-3">$6,820</h4>
                <div className="d-flex align-items-center pb-1">
                  <span className="me-2 rounded-circle bg-light-danger round-20 d-flex align-items-center justify-content-center">
                    <i className="ti ti-arrow-down-right text-danger" />
                  </span>
                  <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                  <p className="fs-3 mb-0">last year</p>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-end">
                  <div className="text-white bg-secondary rounded-circle p-6 d-flex align-items-center justify-content-center">
                    <i className="ti ti-currency-dollar fs-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="earning" />
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Statistic;
