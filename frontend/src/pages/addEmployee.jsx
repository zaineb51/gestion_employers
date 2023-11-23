//importation des modules nécessaires depuis React et Axios
import React, { useEffect, useState } from "react";
import employeeService from "../services/employeeService";
import departmentService from "../services/departmenService";

//importer le hook useNavigate() depuis React Router pour la navigation
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  //etat local data pour stocker les données
  const [data, setData] = useState({});
  //etat local listDepartment pour stocker la liste des départements
  const [listDepartment, setListDepartment] = useState();

  const [photo, setPhoto] = useState({});

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
    //création d'objet FormData pour envoyer des données de formulaire
    const formData = new FormData();
    //ajouter les champs du formulaire à l'objet FormData
    formData.append("employeeName", data.employeeName);
    formData.append("genre", data.genre);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("phone", data.phone);
    formData.append("hireDate", data.hireDate);
    formData.append("typeOfContract", data.typeOfContract);
    formData.append("Salary", data.Salary);
    formData.append("photo",  photo);
    formData.append("department", data.department);

    //appel du service employeeService pour créer un nouvel employé
    employeeService
      .create(formData)
      .then((res) => {
        console.log(res);
        //navigation vers la page "/employees" après la création réussie
        navigate("/employees");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //fonction de gestion du changement de fichier photo
  const handlePhoto = (e) => {
    //mise à jour de l'état local avec le fichier photo sélectionné
    setPhoto(e.target.files[0]);
  };

  //fonction pour récupérer la liste des départements
  const List = () => {
    //appel du service pour récupérer tous les départements
    departmentService
      .getall()
      .then((res) => {
        console.log(res.data.data);
        //mettre à jour de l'état local avec la liste des départements récupérée avec setListDepartment
        setListDepartment(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    List();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="card-body-title">
                <h6 className="card-title fw-semibold mb-4">Nouveau Employé</h6>
              </div>
              <form onSubmit={submitHandle} className="container">
                <div className="mb-4">
                  <label className="form-label">Nom Employé :</label>
                  <input
                    name="employeeName"
                    value={data?.employeeName}
                    onChange={ChangeHandle}
                    type="text"
                    className="form-control"
                    placeholder="nom"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Date de naissance :</label>
                  <input
                    name="dateOfBirth"
                    value={data?.dateOfBirth}
                    onChange={ChangeHandle}
                    type="date"
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Genre :</label>
                  <input
                    name="genre"
                    value={data?.genre}
                    onChange={ChangeHandle}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Type de Contrat :</label>
                  <input
                    name="typeOfContract"
                    value={data?.typeOfContract}
                    onChange={ChangeHandle}
                    type="text"
                    className="form-control"
                    placeholder="nom d'employé"
                  />
                </div>
                <div className="mb-4">
                  <label className="group-text">Date d'embauche :</label>
                  <input
                    type="date" name="hireDate"
                    value={data?.hireDate}
                    onChange={ChangeHandle}
                    className="form-control"
                    placeholder="description"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Numéro de Téléphone:</label>
                  <input
                    name="phone"
                    value={data?.phone}
                    onChange={ChangeHandle}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Salaire :</label>
                  <input
                    name="Salary"
                    value={data?.Salary}
                    onChange={ChangeHandle}
                    type="text"
                    className="form-control"
                    placeholder="nom d'employé"
                  />
                </div>
                <div className="p-2 w-50 bd-highlight">
                  <input
                    className="m-2"
                    type="file"
                    value={data?.photo}
                    name="photo"
                    onChange={handlePhoto}
                    multiple
                  />
                </div>
                <div className="mb-4">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Département :
                  </label>

                  <select
                    name="department"
                    value={data?.department}
                    onChange={ChangeHandle}
                    className="select2 form-select"
                  >
                    <option selected disabled>
                      Liste département
                    </option>
                    {listDepartment?.map((item) => {
                      return (
                        <option value={item._id}>{item.nameDepartment} </option>
                      );
                    })}
                  </select>
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
};

export default AddEmployee;
