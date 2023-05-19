import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { MemoryRouter } from 'react-router-dom';

describe('Register component', () => {
  it('should register successfully with valid input', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const nombreInput = getByLabelText('Nombre');
    const apellidosInput = getByLabelText('Apellidos');
    const celularInput = getByLabelText('Celular');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('REGISTRARSE');
    
    global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: () => Promise.resolve(['Usuario registrado correctamente']),
      });
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = getByText('Usuario registrado correctamente');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for empty names', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const nombreInput = getByLabelText('Nombre');
    const apellidosInput = getByLabelText('Apellidos');
    const celularInput = getByLabelText('Celular');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('REGISTRARSE');
    
    global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: () => Promise.resolve(['Se requiere un nombre válido.']),
      });
    fireEvent.change(nombreInput, { target: { value: '' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText('Se requiere un nombre válido.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for empty last names', async () => {
    // Test case: Empty last names
    // Expected result: The system displays an error message indicating that valid last names are required.
    // Arrange
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const nombreInput = getByLabelText('Nombre');
    const apellidosInput = getByLabelText('Apellidos');
    const celularInput = getByLabelText('Celular');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('REGISTRARSE');
    
    global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: () => Promise.resolve(['Se requieren apellidos válidos.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: '' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText('Se requieren apellidos válidos.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for invalid email address', async () => {
    // Test case: Invalid email address
    // Expected result: The system displays an error message indicating that a valid email address is required.
    // Arrange
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const nombreInput = getByLabelText('Nombre');
    const apellidosInput = getByLabelText('Apellidos');
    const celularInput = getByLabelText('Celular');
    const emailInput = getByLabelText('Correo Electronico');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('REGISTRARSE');
    
    global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: () => Promise.resolve(['Se requiere una dirección de correo electrónico válida.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText("Se requiere una dirección de correo electrónico válida.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

});
