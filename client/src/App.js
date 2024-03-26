import Axios from "axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import "./App.css"


function App() {
  const [name, setName] = useState("Dokdoi");
  const [id, setID] = useState(0);
  const [email, setEmail] = useState("");

  const [employeeList, setEmployeeList] = useState([]); /*cus emp data is a list grammar ถูกป๊ะวะ*/
 // const [emplist, setEmplist] = useState([]);

  const getEmployee = async () => {
    await Axios.get("http://localhost:5001/employees").then((response) => {
      setEmployeeList(response.data);
    })
  }

  const getbyname = async () => {
    await Axios.post("http://localhost:5001/getbyname",{name: name}).then((response) => {
      setEmployeeList(response.data)
    })
  }

  const addemployee = async () => {
    await Axios.post("http://localhost:5001/create",{id,name,email}).then(( ) => {
      setEmployeeList([...employeeList,{id: id
                                        ,name: name
                                        ,email: email,},])
    })
  }


  return (
    <div className="App container">
      <h1>Employees Infomation</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
          <label className="form-label" htmlFor="id">
              ID:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter id"
              onChange={(event) => {
                setID(event.target.value)
              }}
            />
            <label className="form-label" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(event) => {
                setName(event.target.value)
              }}
            />
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email"
              onChange = {(event) => {
                setEmail(event.target.value) 
              }}
            />
          </div>
          <button onClick={addemployee} class="btn btn-success">
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employees">
        <button class="btn btn-primary" onClick={getEmployee}>
          Show Employees
        </button>
        <br />
        <br />
        <button class="btn btn-primary" onClick={getbyname}>
          Show Employees ID
        </button>
        <br />
        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">ID: {val.id}</p>
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Email: {val.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
