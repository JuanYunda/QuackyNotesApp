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
    const emailInput = getByLabelText('Correo Electronico');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('REGISTRARSE');
    
    global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: () => Promise.resolve(['Usuario registrado correctamente']),
      });
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const successMessage = getByText('Usuario registrado correctamente');
      expect(successMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for empty name', async () => {
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
        json: () => Promise.resolve(['Se requiere un nombre válido.']),
      });
    fireEvent.change(nombreInput, { target: { value: '' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText('Se requiere un nombre válido.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for empty last names', async () => {
    // Test case: Empty last names.
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
    const emailInput = getByLabelText('Correo Electronico');
    const submitButton = getByText('REGISTRARSE');
    
    global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: () => Promise.resolve(['Se requieren apellidos válidos.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: '' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText('Se requieren apellidos válidos.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for phone number with less than 10 digits', async () => {
    // Test case: Cell phone must not have less than 10 digits.
    // Expected result: The system displays an error message indicating that valid phone number required.
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
    const emailInput = getByLabelText('Correo Electronico');
    const submitButton = getByText('REGISTRARSE');
    
    global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: () => Promise.resolve(['Se requiere un número de celular válido.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '123456789' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText('Se requiere un número de celular válido.');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for non-numeric characters phone number', async () => {
    // Test case: Cell phone with non-numeric characters.
    // Expected result: The system displays an error message indicating that valid phone number required.
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
    const emailInput = getByLabelText('Correo Electronico');
    const submitButton = getByText('REGISTRARSE');
    
    global.fetch = jest.fn().mockResolvedValue({
        status: 400,
        json: () => Promise.resolve(['Se requiere un número de celular válido.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: 'I23A5678q' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText('Se requiere un número de celular válido.');
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
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText("Se requiere una dirección de correo electrónico válida.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for password with less than 8 characters', async () => {
    // Test case: Password with less than 8 characters.
    // Expected result: The system displays an error message indicating that password must be at least 8 characters long.
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
        json: () => Promise.resolve(['La contraseña debe tener al menos 8 caracteres.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pw123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText("La contraseña debe tener al menos 8 caracteres.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for password without capital letters', async () => {
    // Test case: Password without capital letters.
    // Expected result: The system displays an error message indicating that password must be any capital letter.
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
        json: () => Promise.resolve(['La contraseña debe contener al menos una letra mayúscula.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText("La contraseña debe contener al menos una letra mayúscula.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for password without lowercase letters', async () => {
    // Test case: Password without lowercase letters.
    // Expected result: The system displays an error message indicating that password must be any lowercase letter.
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
        json: () => Promise.resolve(['La contraseña debe contener al menos una letra minúscula.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'PASSWORD123!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText("La contraseña debe contener al menos una letra minúscula.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for password without numbers', async () => {
    // Test case: Password without numbers.
    // Expected result: The system displays an error message indicating that password must be any number.
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
        json: () => Promise.resolve(['La contraseña debe contener al menos un número.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password!' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText("La contraseña debe contener al menos un número.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for password without special character', async () => {
    // Test case: Password without special character.
    // Expected result: The system displays an error message indicating that password must be any special character.
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
        json: () => Promise.resolve(['La contraseña debe contener al menos un carácter especial.']),
      });
    // Act
    fireEvent.change(nombreInput, { target: { value: 'John' } });
    fireEvent.change(apellidosInput, { target: { value: 'Doe' } });
    fireEvent.change(celularInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.click(submitButton);
    // Assert
    await waitFor(() => {
      const errorMessage = getByText("La contraseña debe contener al menos un carácter especial.");
      expect(errorMessage).toBeInTheDocument();
    });
  });

});
