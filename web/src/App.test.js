import { render, screen } from '@testing-library/react';
import Notes from './components/Notes';

describe("Pruebas con JEST", () => {
  test("renderiza 3 elementos de tipo li", ()=>{
      render(<Notes/>);
      const elementosLi = screen.getAllByRole('listitem');
      expect(elementosLi.length).toBe(3);
  })
})
