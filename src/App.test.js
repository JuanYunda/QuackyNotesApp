import { render, screen } from '@testing-library/react';
import App from './App';

describe("Pruebas de ejemplo", () => {
  test("renderiza 3 elementos de tipo li", ()=>{
      render(<App/>);
      const elementosLi = screen.getAllByRole('listitem');
      expect(elementosLi.length).toBe(3);
  })
})
