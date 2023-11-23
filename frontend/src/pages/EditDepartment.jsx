import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import departmenService from "../services/departmenService";
import Swal from "sweetalert2";

const EditDepartment = () => {

  const navigate=useNavigate()

  const [department, setDepartment]=useState({});
  const {id}=useParams();

 

  useEffect(() => {
  departmenService.depabyId(id).then(res=>{
  console.log(res.data.data);
 setDepartment(res.data.data)
 });
 }, []); 

  const handleChange = (e) => {
    setDepartment({
      ...department,
      [e.target.name]: e.target.value,
    });
    console.log(department);
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
    departmenService.update(id,department).then((res)=>{
      
      console.log(res);
      navigate("/departments")

    }).catch((err)=>{
      console.log(err);
    })
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})

};

  return (
    <div>
      <div className="container-fluid">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title fw-semibold mb-4">Modifier Département</h6>
              {/* <Link className="btn btn-primary" to="/addcategory" role="button">
                {" "}
                Nouveau Département
              </Link> */}
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Nom Département :
                      </label>
                      <input name="nameDepartment" value={department?.nameDepartment} onChange={handleChange} type="text" className="form-control" />
                    </div>

  

                    <div className="mb-3">
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Description :
                      </label>
                      <textarea name="description" value={department?.description} onChange={handleChange}
                        className="form-control"
                         rows="3"
                      ></textarea>
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

export default EditDepartment;

