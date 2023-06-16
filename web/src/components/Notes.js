import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Nota from './Nota';
import { Box } from '@mui/material';

export default function Notes(props) {
  const location = useLocation();
  const user = location.state.user;
  const baseUrl = window.location.protocol + "//" + window.location.hostname + ":8000/api/";

  const [notas, setNotas] = useState(props.data)

  useEffect(() => {
    loadingNotes()
  },[])

  const loadingNotes = async (event) => {
    try {
      const response = await fetch(baseUrl + 'notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario: user.id
        })
      });
      const data = await response.json();

      if (response.status === 200) {
        setNotas(data)
        console.log(data);
      } else {
        console.log('error', data);
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {user && (
        <p>Datos del usuario logeado: {`id: ${user.id}, nombre: ${user.nombre}, apellidos: ${user.apellidos}`}</p>
      )}
<Box sx={{display:'flex'}}>
  {
    notas ? (
      notas.map((n, index) => {
        return (
          <Nota key={n.titulo} nota={n}></Nota>
        )
      })
    ) : (
      <p>Aún no hay notas</p>
    )
  }
</Box>

    </>
  );
}

