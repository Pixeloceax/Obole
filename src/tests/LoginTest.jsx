import React, { useState, useEffect } from "react";
import axios from "axios";

function LoginTest() {
  const [securityList, setSecurityList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/security")
      .then((res) => {
        setSecurityList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Security List</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Password</th>
            <th className="px-4 py-2">Pin</th>
          </tr>
        </thead>
        <tbody>
          {securityList.map((security) => (
            <tr key={security._id}>
              <td className="border px-4 py-2">{security.username}</td>
              <td className="border px-4 py-2">{security.password}</td>
              <td className="border px-4 py-2">{security.pin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoginTest;
