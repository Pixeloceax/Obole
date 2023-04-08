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
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Clients</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
                        <td className="border px-4 py-2">{client.first_name}</td>
              <td className="border px-4 py-2">{client.last_name}</td>
              <td className="border px-4 py-2">
                {client.address.street} {client.address.city}{" "}
                {client.address.postal_code}
              </td>
              <td className="border px-4 py-2">{client.contact.phone}</td>
              <td className="border px-4 py-2">{client.contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
