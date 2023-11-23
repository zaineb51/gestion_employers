import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from "../services/Auth"

const Register = () => {

  const [data, setData] = useState()
  const navigate=useNavigate()

  const handleChange = (e) => {
      setData({
          ...data,
          [e.target.name]: e.target.value
      })
  }

  const onSubmit = (e) => {
      e.preventDefault()
      userService.register(data).then((res) => {
          console.log(data)
          navigate("/login")
      })
  }

    return (
        <>
 <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
  <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xxl-3">
          <div className="card mb-0">
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">Nom d'utilisateur :</label>
                  <input type="text" name='name' className="form-control" id="exampleInputtext1" aria-describedby="textHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label" >Email :</label>
                  <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Mot de Passe :</label>
                  <input type="password" name='password' className="form-control" id="exampleInputPassword1" onChange={handleChange}/>
                </div>
                <button className="btn btn-info w-100 mb-4 ">S'inscrire</button>
                <div className="d-flex align-items-center justify-content-center">
                 <Link className="text-primary fw-bold ms-2" to="/login"> Vous avez déjà un compte ?</Link>
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
}

export default Register;

