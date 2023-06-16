import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBarClean from './NavBarClean';
import { Box, Button, TextField } from '@mui/material';
import errorIcon from "../icons/advertencia.png";

export default function Register() {
  const baseUrl = window.location.protocol + "//" + window.location.hostname + ":8000/api/";
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [celular, setCelular] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(baseUrl + 'register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre,
          apellidos: apellidos,
          celular: celular,
          username: username,
          password: password
        })
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        navigate('/login');
      } else {
        setErrors(data[0]);
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <>
      <NavBarClean/>
      <Box
        sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
        <TextField
          sx={{ width: '15rem' }}
          id="nombre-registrarse"
          label="Nombre"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          variant="outlined" />
        <TextField
          sx={{ width: '15rem' }}
          id="apellidos-registrarse"
          label="Apellidos"
          value={apellidos}
          onChange={(event) => setApellidos(event.target.value)}
          variant="outlined" />
        <TextField
          sx={{ width: '15rem' }}
          id="celular-registrarse"
          label="Celular"
          value={celular}
          onChange={(event) => setCelular(event.target.value)}
          variant="outlined" />
        <TextField
          sx={{ width: '15rem' }}
          id="email-registrarse"
          label="Correo Electronico"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          variant="outlined" />
        <TextField
          sx={{ width: '15rem' }}
          id="contrasena-registrarse"
          label="Contraseña"
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="filled" />
        <br></br>
        {errors && (
                          <div className="errorMsg">
                            <img src={errorIcon}></img>
                             <p>{errors}</p>
                          </div>
                        )}
        <Button variant="contained" onClick={handleSubmit}>REGISTRARSE</Button>
        <br></br>
        <Button variant="text">
          <Link to="/login">INICIAR SESION</Link>
        </Button>

      </Box>
    </>
  );
}
