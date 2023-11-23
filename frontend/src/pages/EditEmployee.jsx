import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import employeeService from "../services/employeeService";
import departmentService from "../services/departmenService";
import Swal from "sweetalert2";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  //etat local data pour stocker les données
  const [employee, setEmployee] = useState({});
  // const [department, setDepartment] = useState();

  //etat local listDepartment pour stocker la liste des départements
  // const [listDepartment, setListDepartment] = useState();

  const [photo, setPhoto] = useState({});

  useEffect(() => {
    employeeService.getOne(id).then((res) => {
      console.log(res.data.data);
      setEmployee(res.data.data);
    });
  }, []);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
    console.log(employee);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //création d'objet FormData pour envoyer des données de formulaire
        const formData = new FormData();
        //ajouter les champs du formulaire à l'objet FormData
        formData.append("employeeName", employee.employeeName);
        formData.append("genre", employee.genre);
        formData.append("dateOfBirth", employee.dateOfBirth);
        formData.append("phone", employee.phone);
        formData.append("hireDate", employee.hireDate);
        formData.append("typeOfContract", employee.typeOfContract);
        formData.append("Salary", employee.Salary);
        formData.append("photo", employee.photo);
        formData.append("department", employee.department);
        employeeService
          .update(id, formData)
          .then((res) => {
            console.log(res);
            navigate("/employees");
          })
          .catch((err) => {
            console.log(err);
          });
        // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  // //fonction pour récupérer la liste des départements
  // const List = () => {
  //   //appel du service pour récupérer tous les départements
  //   departmentService
  //     .getall()
  //     .then((res) => {
  //       console.log(res.data.data);
  //       //mettre à jour de l'état local avec la liste des départements récupérée avec setListDepartment
  //       setListDepartment(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   List();
  // }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title fw-semibold mb-4">
                Modifier les coordonnées de l'employé:{" "}
              </h6>
              <Link class="btn btn-primary" to="/employee" role="button">
                {" "}
                Ajouter Employé
              </Link>
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="" className="form-label">
                        Nom Employé :
                      </label>
                      <input
                        name="name"
                        value={employee?.employeeName}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="name"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Date de naissance : :
                      </label>
                      <textarea
                        name="description"
                        value={employee?.dateOfBirth}
                        onChange={handleChange}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Genre :
                      </label>
                      <textarea
                        name="price"
                        value={employee?.genre}
                        onChange={handleChange}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Type de Contrat :
                      </label>
                      <textarea
                        name="price"
                        value={employee?.typeOfContract}
                        onChange={handleChange}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Date d'embauche :
                      </label>
                      <textarea
                        name="price"
                        value={employee?.hireDate}
                        onChange={handleChange}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Numéro de Téléphone :
                      </label>
                      <textarea
                        name="price"
                        value={employee?.phone}
                        onChange={handleChange}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Salaire :
                      </label>
                      <textarea
                        name="price"
                        value={employee?.Salary}
                        onChange={handleChange}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="p-2 w-50 bd-highlight">
                      <img
                        style={{
                          height: "50%",
                          width: "100%",
                        }}
                        src={"http://localhost:8080/" + employee?.photo}
                        alt="Card image cap"
                      />
                      <input
                        name="photo"
                        onChange={handlePhoto}
                        className="m-2"
                        type="file"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Département :
                      </label>
                      <select
                        name="department"
                        value={employee?.department}
                        onChange={handleChange}
                        className="select2 form-select"
                      >
                        <option selected disabled>logistique </option>
                        
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary ">
                      Valider
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
