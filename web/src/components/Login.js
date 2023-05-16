import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBarClean from './NavBarClean'
import { Box, Button, TextField } from '@mui/material';

export default function Login() {
  const baseUrl = window.location.protocol + "//" + window.location.hostname + ":8000/api/";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(baseUrl + 'login', {
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
      if (response.status === 200) {
        console.log(data);
        navigate('/notes', { state: { user: data.user } })
      } else {
        console.error(data)
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <NavBarClean></NavBarClean>
      <Box
        sx={{display:'grid', alignItems:'center', justifyContent:'center', gap:'5px'}}
        component="form">
        <br />
        <TextField
        sx={{width:'15rem'}}
          id="usuario-login"
          label="Usuario"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          variant="outlined" />
        <br />
        <TextField
          sx={{width:'15rem'}}
          id="contrasena-login"
          label="Contraseña"
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="filled" />
        <br></br>
        <Button variant="contained" onClick={handleSubmit}>Iniciar sesión</Button>
        <br></br>
        <Button variant="text">
          <Link to="/register">Registrarse</Link>
        </Button>

      </Box>

    </>
  );
}
