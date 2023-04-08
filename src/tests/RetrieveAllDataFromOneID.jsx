import React, { useState, useEffect } from "react";
import axios from "axios";

const RetrieveAllDataFromOneID = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:3001/api/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Retrieve All Data From One ID</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" value={id} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Collection</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.collection}>
              <td>{item.collection}</td>
              <td>
                <pre>{JSON.stringify(item.data, null, 2)}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RetrieveAllDataFromOneID;
