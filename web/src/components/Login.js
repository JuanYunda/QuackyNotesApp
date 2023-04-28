import React, { useState } from 'react';

export default function Login() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [celular, setCelular] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
        />
      </label>
      <br />
      <label>
        Apellidos:
        <input
          type="text"
          value={apellidos}
          onChange={(event) => setApellidos(event.target.value)}
        />
      </label>
      <br />
      <label>
        Celular:
        <input
          type="text"
          value={celular}
          onChange={(event) => setCelular(event.target.value)}
        />
      </label>
      <br />
      <label>
        Correo electrónico:
        <input
          type="email"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}
