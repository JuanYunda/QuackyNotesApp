import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const baseUrl = window.location.protocol + "//" + window.location.hostname + ":8000/api/";
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [celular, setCelular] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(baseUrl+'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          celular: celular,
          nombre: nombre,
          apellidos: apellidos
        })
      });
      const data = await response.json();
      if(response.status === 200){
        console.log(data);
        navigate('/login')
      }else{
        console.error(data)
      }

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
