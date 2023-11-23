import "./App.css";

//importé les composants nécessaires depuis react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout"
// import Statistic from "./pages/Statistic";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/addEmployee";
import Departments from "./pages/Departments";
import AddDepartment from "./pages/addDepartment";
import EditDepartment from "./pages/EditDepartment";
import EditEmployee from "./pages/EditEmployee";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

//App: le composant principal de l'application
function App() {
  return (
    <div>
      {/*on utilise Router comme un composant racine de l'application*/}
      <Router>

        {/*utiliser le composant Routes pour définir vos itinéraires */}
        <Routes>

          {/*définit une route avec le chemin "/" qui rend le composant Home */}
          <Route path="/" element={<Home />}>
          <Route path="/" element={<Layout/>} />

           {/*définit une route avec le chemin "/login" qui rend le composant Login */}
           <Route path="/login" element={<Login />} />

           {/*définit une route avec le chemin "/register" qui rend le composant Register */}
          <Route path="/register" element={<Register />} />

          {/*définit une route avec le chemin "/forgotpass" qui rend le composant Register */}
          <Route path="/forgotpass" element={<ForgotPassword />} />

            {/*définit une route avec le chemin "/employees" qui rend le composant employees */}
            <Route path="/employees" element={<Employees/>} />

            {/*définit une route avec le chemin "/addemployee" qui rend le composant employees */}
            <Route path="/employee" element={<AddEmployee/>} />

            {/*définit une route avec le chemin "/editemployee" qui modifier l'employé */}
            <Route path="/editemployee/:id" element={<EditEmployee/>} />

            {/*définit une route avec le chemin "/departments" qui rend le composant departments */}
            <Route path="/departments" element={<Departments/>} />

            {/*définit une route avec le chemin "/addemployee" qui rend le composant employees */}
            <Route path="/department" element={<AddDepartment/>} />

            {/*définit une route avec le chemin "/editdepartment" qui modifier le département */}
            <Route path="/editdepartment/:id" element={<EditDepartment/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

//exporté le composant principal App
export default App;
