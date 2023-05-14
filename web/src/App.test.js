import { render, screen } from '@testing-library/react';
import Notes from './components/Notes';
import { MemoryRouter } from 'react-router-dom';

describe("Pruebas con JEST", () => {
  test("renderiza 3 elementos de tipo li", ()=>{
    const user = { id: '1', nombre: "andres", apellidos: "prueba" };
    render(
      <MemoryRouter initialEntries={[{ pathname: '/notes', search: '?value=teresa_teng', state: user }]}>
        <Notes />
      </MemoryRouter>
    );
    const elementosLi = screen.getAllByRole('listitem');
    expect(elementosLi.length).toBe(3);
  })
})
