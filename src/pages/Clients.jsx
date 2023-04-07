import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('/clients')
      .then(res => {
        setClients(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Clients</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client._id}>
              <td>{client.first_name} {client.last_name}</td>
              <td>{client.address.street} {client.address.city} {client.address.postal_code}</td>
              <td>{client.contact.phone}</td>
              <td>{client.contact.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;
