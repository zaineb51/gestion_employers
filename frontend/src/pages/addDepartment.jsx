//importation des modules nécessaires depuis React et Axios
import React, {useState } from "react";
import departmentService from "../services/departmenService"

//importer le hook useNavigate() depuis React Router pour la navigation
import { useNavigate } from "react-router-dom";


const AddDepartment = () => {
  const navigate = useNavigate();

  //etat local data pour stocker les données
  const [data, setData] = useState({});

  //fonction pour gérer les changements d'input
  const ChangeHandle = (e) => {
    //mettre à jour de data en utilisant la valeur actuelle et le nom de l'input
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log(data);
  };

//fonction de gestion de la soumission du formulaire
  const submitHandle = (e) => {
    //empêche le comportement par défaut du formulaire
    e.preventDefault();

    //appel du service departmentService pour créer un nouvel département
    departmentService
      .create(data)
      .then((res) => {
        console.log(res);
        //navigation vers la page "/departments" après la création réussie
        navigate("/departments");
      })
      .catch((err) => {
        console.log(err);
      });
  };
    return (
        <div>
            <div className="container-fluid">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="card-body-title">
                <h6 className="card-title fw-semibold mb-4">
                  Nouveau Département
                </h6>
              </div>
              <form onSubmit={submitHandle} className="container">
                <div className="mb-4">
                  <label className="form-label">
                    Nom Département :
                  </label>
                  <input
                    name="nameDepartment"
                    value={data?.nameDepartment}
                    onChange={ChangeHandle}
                    type="text"
                    className="form-control"
                    placeholder="nom"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">
                    Description :
                  </label>
                  <input
                    name="description"
                    value={data?.description}
                    onChange={ChangeHandle}
                    type="text"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary ">
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> 
        </div>
    );
}

export default AddDepartment;
