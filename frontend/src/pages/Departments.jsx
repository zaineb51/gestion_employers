//importation des modules nécessaires depuis React et Axios
import React, { useEffect,useState } from "react";
import departmentService from "../services/departmenService";

//importation du Swal depuis la bibliothèque "sweetalert2"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Departments = () => {
  //déclaration data à l'aide de useState
  const [data, setData] = useState();

  //déclaration inputText à l'aide de useState, pour filtrer les données
  const [inputText, setInputText] = useState("");

  //filtrer data en fonction de la valeur de inputText
  const filterData = data?.filter((item) => {
    //vérifier si inputText est vide
    if (inputText === "") {
      //si inputText est vide, retourne l'élément tel quel (aucun filtre appliqué)
      return item;
    } else {
      //sinon, filtre les éléments dont le nom inclut la sous-chaîne inputText
      //toLowerCase(): pour rendre la recherche insensible à la casse
      return item.name.toLowerCase().includes(inputText.toLowerCase());
    }
  });

  //fonction pour gèrr les changements d'entrée dans un champ de texte
  const handleInput = (e) => {
    //récupérer la valeur saisie par l'utilisateur dans le champ de texte
    const inputValue = e.target.value.toLowerCase();

    //mise à jour de l'état local inputText avec la valeur convertie en minuscule
    setInputText(inputValue);
  };

  //fonction List pour afficher list employee
  const List = () => {
    //appel d'un service pour récupérer toutes les départements
    departmentService
      .getall()
      .then((res) => {
        console.log(res.data.data);

        //mise à jour de l'état local data avec les données reçues de la requête
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //appel  List() lors du récupération des données
    List();
  }, []); //tableau de dépendances vide [] indique que l'effet ne dépend d'aucune variable, donc il ne s'exécute qu'une seule fois après le rendu initial

  const handleRemove = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
          departmentService
            .deleteOne(id)
            .then((res) => {
              List();
            })
            .catch((err) => {
              console.log(err);
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h6
              className="card-title fw-semibold mb-4"
              style={{ color: "green", fontSize: "2rem" }}
            >
              Liste des départements
            </h6>
            {/*champ de saisie pour la recherche */}
            <input
              onChange={handleInput}
              type="text"
              placeholder=" search"
              style={{
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "15px",
                border: "3px solid #00b4cc ",
                borderRadius: "3px",
              }}
            ></input>
          </div>
          <Link class="btn btn-secondary" to="/department" role="button">
            Ajouter département
          </Link>
        </div>
        <div className="card-table container ">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nom Département</th>
                <th scope="col">Descrption</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {/*mapping à travers les éléments filtrés de filterData pour afficher chaque ligne de tableau*/}
              {filterData?.map((item, index) => {
                return (
                  <tr key={item._id}>
                    {/* Colonne d'index */}
                    <th scope="row" data-title="ID">
                      {index}
                    </th>

                    {/*colonne du nom de département */}
                    <td data-title="Nom Département">{item.nameDepartment}</td>

                    {/*colonne descrption de départment*/}
                    <td data-title="Département">
                      {item.description}
                    </td>
                    {/*colonne des actions (modification et suppression) */}
                    <td>
                      {/*bouton pour rediriger vers la page de modifier le département*/}
                      <Link to={`/editdepartment/${item._id}`}>
                        <i
                          class="las la-edit"
                          style={{
                            fontSize: "25px",
                            color: "green",
                            marginLeft: "3px",
                          }}
                        />
                      </Link>
                      {/*bouton pour supprimer l'employé avec la fonction handleRemove */}
                      <button
                        onClick={(e) => handleRemove(item._id)}
                        style={{
                          backgroundColor: "transparent",
                          border: "0",
                        }}
                      >
                        <i
                          class="las la-trash-alt"
                          style={{
                            fontSize: "25px",
                            color: "red",
                            marginRight: "3px",
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Departments;
