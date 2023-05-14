import React from 'react';
import { useLocation } from 'react-router-dom';

function Notes() {
  const location = useLocation();
  const user = location.state.user;
  console.log(location)
  return (
    <>
      <p>Datos del usuario logeado: {`id: ${user.id}, nombre: ${user.nombre}, apellidos: ${user.apellidos}`}</p>

      <ul>
      <li>Nota 1</li>
      <li>Nota 2</li>
      <li>Nota 3</li>
    </ul>
    </>
  );
}

export default Notes;
