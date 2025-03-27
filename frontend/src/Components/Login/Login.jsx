import React, { useState, useEffect } from 'react';
import './Login.css';

const Login = () => {
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [editData, setEditData] = useState({ id: null, name: "", email: "" });

  useEffect(() => {
    if (token) loadUsers();
  }, [token]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

  const registerUser = async () => {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    alert(data.message);
  };

  const loginUser = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();
    data.token ? setToken(data.token) : alert("Login failed");
  };

  const loadUsers = async () => {
    const response = await fetch("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(await response.json());
  };

  const deleteUser = async (userId) => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    alert((await response.json()).message);
    loadUsers();
  };

  const updateUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${editData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: editData.name, email: editData.email, role: "admin" }),
    });
    alert((await response.json()).message);
    loadUsers();
    setEditData({ id: null, name: "", email: "" });
  };

  const logoutUser = () => {
    setToken("");
    setUsers([]);
  };

  return (
    <div className="container">
      <div className="form-container">
        {!token ? (
          <div className="card">
            <h2>{showRegister ? "Register" : "Login"}</h2>
            <div className="form-group">
              {showRegister && <input type="text" name="name" placeholder="Name" onChange={handleChange} />}
              <input type="email" name="email" placeholder="Email" onChange={showRegister ? handleChange : handleLoginChange} />
              <input type="password" name="password" placeholder="Password" onChange={showRegister ? handleChange : handleLoginChange} />
            </div>
            <button className="btn-primary" onClick={showRegister ? registerUser : loginUser}>
              {showRegister ? "Register" : "Login"}
            </button>
            <p className="switch">
              {showRegister ? "Already have an account? " : "Don't have an account? "}
              <span onClick={() => setShowRegister(!showRegister)}>
                {showRegister ? "Login" : "Sign up"}
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-center">User List</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className="badge">{user.role}</span></td>
                      <td>
                        <button className="btn-danger btn-list" onClick={() => deleteUser(user.id)}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="20" viewBox="0 0 50 50">
<path fill="#429ad4" d="M21.069,12.318c-0.04-0.867-0.08-1.734-0.12-2.601c-0.028-0.615-0.178-1.41,0.064-1.999 c0.211-0.512,0.886-0.554,1.364-0.632c0.842-0.137,1.69-0.235,2.541-0.296c0.866-0.062,1.735-0.081,2.602-0.041 c0.432,0.02,0.865,0.052,1.295,0.106c0.289,0.036,0.831,0.036,1.086,0.206c0.427,0.285,0.396,1.103,0.395,1.543 c-0.002,0.886-0.082,1.776-0.221,2.651c-0.085,0.533,0.137,1.076,0.698,1.23c0.476,0.131,1.144-0.162,1.23-0.698 c0.183-1.144,0.333-2.323,0.29-3.484c-0.035-0.95-0.246-2.014-0.989-2.678c-0.768-0.685-1.947-0.724-2.919-0.815 c-1.08-0.102-2.167-0.102-3.249-0.034c-1.101,0.069-2.201,0.203-3.29,0.382c-0.919,0.151-1.808,0.452-2.371,1.24 c-0.519,0.726-0.59,1.642-0.562,2.507c0.037,1.138,0.104,2.276,0.156,3.413C19.128,13.599,21.128,13.606,21.069,12.318 L21.069,12.318z"></path><path fill="#429ad4" d="M42.867,12.357c-0.39-0.975-1.067-1.629-2.058-1.919c-0.734-0.216-10.669-0.416-10.669-0.416 s-14.888,0.422-17.558,0.626c-1.448,0.168-2.412,0.269-3.36,0.968c-1.328,0.98-1.935,2.68-1.145,4.242 c0.54,1.068,1.456,1.661,2.486,1.992c0.489,4.561,1.282,9.081,1.832,13.636c0.318,2.64,0.389,5.314,0.781,7.943 c0.317,2.123,1.01,5.209,3.354,5.792c1.203,0.299,2.542,0.118,3.766,0.092c1.339-0.029,2.677-0.058,4.016-0.087 c2.671-0.058,5.343-0.106,8.014-0.174c1.162-0.029,2.377-0.12,3.397-0.759c0.89-0.558,1.548-1.446,1.972-2.419 c0.974-2.238,1.197-4.848,1.373-7.268c0.221-3.038,0.206-6.095,0.254-9.14c0.044-2.757,0.087-5.514,0.131-8.272 c1.636,0.083,3.489,0.056,3.907-1.906C43.572,14.289,43.233,13.271,42.867,12.357z"></path><path fill="#231f20" d="M10.986,18.686c9.362-0.411,18.728-0.681,28.099-0.697c0.643-0.001,0.645-1.001,0-1 c-9.371,0.015-18.738,0.286-28.099,0.697C10.345,17.714,10.341,18.714,10.986,18.686L10.986,18.686z"></path><path fill="#fff" d="M10.946,15.912c5.243-0.366,10.503-0.231,15.75-0.498c1.921-0.098,1.933-3.098,0-3 c-5.247,0.267-10.507,0.132-15.75,0.498c-0.808,0.056-1.5,0.649-1.5,1.5C9.446,15.181,10.133,15.969,10.946,15.912L10.946,15.912z"></path><path fill="#231f20" d="M17.761,23.937c0.148,5.513,0.33,11.025,0.546,16.536c0.025,0.641,1.025,0.645,1,0 c-0.216-5.511-0.399-11.023-0.546-16.536C18.744,23.294,17.744,23.292,17.761,23.937L17.761,23.937z"></path><path fill="#231f20" d="M25.663,24.255c-0.092,5.256-0.183,10.511-0.275,15.767c-0.011,0.644,0.989,0.644,1,0 c0.092-5.256,0.183-10.511,0.275-15.767C26.674,23.611,25.674,23.611,25.663,24.255L25.663,24.255z"></path><path fill="#231f20" d="M33.502,24.585c-1.111,4.801-2.006,9.648-2.683,14.529c-0.087,0.629,0.876,0.902,0.964,0.266 c0.677-4.881,1.572-9.728,2.683-14.529C34.611,24.225,33.647,23.958,33.502,24.585L33.502,24.585z"></path><path fill="#99c93c" d="M4.078,32.522c0.593,0.548,1.152,1.132,1.67,1.751c0.128,0.153,0.253,0.307,0.376,0.464 c0.018,0.023,0.114,0.145,0.024,0.03c-0.097-0.125,0.023,0.03,0.043,0.057c0.06,0.079,0.119,0.159,0.178,0.24 c0.241,0.33,0.471,0.669,0.691,1.014c0.281,0.441,0.902,0.659,1.368,0.359c0.441-0.284,0.659-0.896,0.359-1.368 c-0.924-1.451-2.031-2.792-3.295-3.96c-0.384-0.355-1.039-0.409-1.414,0C3.724,31.494,3.668,32.143,4.078,32.522L4.078,32.522z"></path><path fill="#99c93c" d="M2.767,39.39c0.34,0.122,0.676,0.254,1.012,0.39c0.102,0.043,0.089,0.037-0.039-0.017 c0.044,0.019,0.089,0.038,0.133,0.057c0.066,0.029,0.133,0.058,0.199,0.087c0.165,0.073,0.329,0.149,0.493,0.226 c0.643,0.304,1.27,0.64,1.881,1.003c0.45,0.267,1.117,0.116,1.368-0.359c0.255-0.482,0.122-1.083-0.359-1.368 c-1.318-0.782-2.714-1.429-4.156-1.947c-0.493-0.177-1.116,0.2-1.23,0.698C1.94,38.722,2.239,39.2,2.767,39.39L2.767,39.39z"></path><path fill="#99c93c" d="M7.214,48.113c1.172-1.031,2.336-2.071,3.491-3.122c0.388-0.353,0.385-1.061,0-1.414 c-0.415-0.381-1-0.376-1.414,0c-1.155,1.05-2.319,2.091-3.491,3.122c-0.394,0.347-0.381,1.065,0,1.414 C6.22,48.498,6.793,48.482,7.214,48.113L7.214,48.113z"></path><path fill="#ff9600" d="M37.489,4.825c0.418,1.144,1.192,2.176,2.291,2.745c0.556,0.288,1.137,0.455,1.761,0.501 c0.617,0.046,1.208-0.104,1.766-0.355c0.479-0.216,0.63-0.947,0.359-1.368c-0.319-0.495-0.856-0.589-1.368-0.359 c0.091-0.041,0.165-0.063,0.027-0.015c-0.041,0.014-0.082,0.028-0.123,0.04c-0.089,0.026-0.197,0.031-0.283,0.065 c0.193-0.075,0.145-0.017,0.042-0.009c-0.054,0.004-0.107,0.007-0.161,0.008c-0.097,0.002-0.194-0.002-0.291-0.01 c-0.097-0.008-0.163-0.066,0.04,0.008c-0.039-0.014-0.088-0.015-0.129-0.024c-0.097-0.02-0.192-0.045-0.287-0.073 c-0.092-0.028-0.187-0.079-0.281-0.099c0.211,0.045,0.103,0.044,0.027,0.007c-0.05-0.024-0.099-0.049-0.148-0.075 c-0.088-0.047-0.173-0.099-0.256-0.153c-0.037-0.024-0.073-0.049-0.11-0.075c-0.131-0.093-0.025-0.055,0.018,0.016 c-0.046-0.076-0.164-0.141-0.229-0.204C40.075,5.321,40,5.242,39.928,5.16c-0.008-0.009-0.147-0.19-0.06-0.067 c0.088,0.125-0.047-0.066-0.052-0.073c-0.063-0.089-0.121-0.181-0.177-0.275c-0.055-0.094-0.107-0.19-0.154-0.288 c-0.011-0.023-0.04-0.121-0.061-0.132c0.048,0.116,0.059,0.14,0.032,0.071c-0.013-0.034-0.026-0.068-0.038-0.102 c-0.179-0.49-0.687-0.874-1.23-0.698C37.706,3.751,37.296,4.299,37.489,4.825L37.489,4.825z"></path><path fill="#ff9600" d="M46.25,5.372c1.287,0,1.289-2,0-2C44.963,3.372,44.961,5.372,46.25,5.372L46.25,5.372z"></path>
</svg></button>
                        <button className="btn-warning btn-list" onClick={() => setEditData(user)}>📝</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {editData.id && (
              <div className="card">
                <h3>Edit User</h3>
                <input type="text" name="name" value={editData.name} onChange={handleEditChange} />
                <input type="email" name="email" value={editData.email} onChange={handleEditChange} />
                <button className="btn-success" onClick={updateUser}>Update</button>
              </div>
            )}
            <button className="btn-secondary" onClick={logoutUser}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
