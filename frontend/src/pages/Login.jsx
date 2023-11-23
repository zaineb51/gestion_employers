import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import userService from "../services/Auth"
import { useDispatch } from "react-redux";
import { loginError, loginStart, loginSuccess } from "../Redux/UserRedux";

const Login = () => {
  const dispatch = useDispatch()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitHandle = (e) => {
      e.preventDefault();
      dispatch(loginStart())
      console.log(user);
      user.Login(user).then((res) => {
          console.log(res.data.data._id);
          setUser(res.data)
          localStorage.setItem('user', JSON.stringify(res.data))
          localStorage.setItem('id', (res.data.data._id))


          if (res.data.data.verified === true) {
              setIsLoggedIn(true);
              dispatch(loginSuccess(res.data))
              return navigate("/")
              alert(isLoggedIn);



          } else {
              Swal.fire(
                  'Ooooops!',
                  'Please Verify your account first!',
                  'error'
              );
              dispatch(loginError())
          } 
          

      })
          .catch((err) => {
              console.log(err);/*  */
              Swal.fire(
                  'Mail or Password Incorrect! ',
                  'You clicked the button!',
                  'error'
              );
              
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
              <p className="tex-center fw-bold fs-4" >Gestion Des Employés    🏢</p>
              <form  onSubmit={onSubmitHandle}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
                  <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-4">
                  <label htmlFor="exampleInputPassword1" className="form-label">Mot de Passe :</label>
                  <input type="password" name="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} />
                </div>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <Link className="text-primary fw-bold" to="/forgotpass">Oublié le mot de passe ?</Link>
                </div>
                <button className="btn btn-info w-100 mb-4 ">Login</button>
                <div className="d-flex align-items-center justify-content-center">
                  <Link className="text-primary fw-bold ms-2" to="/register">Créer un compte ?</Link>
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

export default Login;
