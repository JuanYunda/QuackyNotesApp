import { render, screen } from '@testing-library/react';
import Notes from './Notes';
import { MemoryRouter } from 'react-router-dom';

describe("Pruebas con JEST", () => {
  test("Renderiza 3 elementos de tipo Nota", () => {
    const user = { id: '1', nombre: "andres", apellidos: "prueba" };
    const data = [{ titulo: "Titulo 1", descripcion: "Descripcion del 1" },
    {titulo: "Titulo 2", descripcion: "Descripcion del 2"},
    {titulo: "Titulo 3", descripcion: "Descripcion del 3"}]
    render(
      <MemoryRouter initialEntries={[{ pathname: '/notes', search: '?value=teresa_teng', state: user }]}>
        <Notes data={data}></Notes>
        {
          // notas.map((n, index) => {
          //   return (
          //     <Nota key={n.titulo} nota={n}></Nota>
          //   )
          // })
        }
      </MemoryRouter>
    );
    const elementosLi = screen.getAllByTestId('titulo');
    expect(elementosLi.length).toBe(3);

    let contenidoElement = screen.getByText(data[0].descripcion);
    expect(contenidoElement).toBeInTheDocument();

    contenidoElement = screen.getByText(data[1].descripcion);
    expect(contenidoElement).toBeInTheDocument();

    contenidoElement = screen.getByText(data[2].descripcion);
    expect(contenidoElement).toBeInTheDocument();
  })
})
