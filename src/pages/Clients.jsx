import React, { useState, useEffect } from "react";
import axios from "axios";

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/clients")
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>{client.first_name}</td>
              <td>{client.last_name}</td>
              <td>
                {client.address.street} {client.address.city}{" "}
                {client.address.postal_code}
              </td>
              <td>{client.phone}</td>
              <td>{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
