import { useEffect, useState } from "react";

import { UserData } from "./components/user_data";

import logo from "../../logo.svg";
import "../../App.css";
import "./css/user.css";
import { Link } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("useeffect called..");

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  },[]);

  console.log('User index called')
  
  const getAddress = (address) => {
    let counter = 0;
    let newaddress = "";
    for (let i in address) {
      counter += 1;
      if (counter < 4) {
        newaddress = newaddress + address[i] + ",";
      }
      if (counter === 4) {
        newaddress = newaddress + address[i];
      }
    }
    return newaddress;
  };

  if (users.length === 0) {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }

  return (
    <div className="container">
      <table className="table">
        <thead className="header">
          <tr className="headerrow">
            <th className="th">Name</th>
            <th className="th">Email</th>
            <th className="th">Address</th>
            <th className="th">Phone</th>
            <th className="th">Posts</th>
          </tr>
        </thead>
        <tbody className="tabcontent">
          {users.map((udata) => (
            <UserData user={udata} key={udata.id} getAddress={getAddress} />
          ))}
        </tbody>
      </table>
      <Link to={`/`}>Go to Home</Link>
    </div>
  );
};
