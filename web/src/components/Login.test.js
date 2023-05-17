import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom';

describe('Login component', () => {
  it('should display an error message for unrecognized email', async () => {
    const { getByLabelText, getByText } = render(
    <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng', state: null }]}>
    <Login />
    </MemoryRouter>
    );
    const emailInput = getByLabelText('Usuario');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('Iniciar sesión');
    global.fetch = jest.fn().mockResolvedValue({
        status: 404,
        json: () => Promise.resolve({ detail: 'User not found!' }),
      });
    fireEvent.change(emailInput, { target: { value: 'unrecognized@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText('User not found!');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should display an error message for incorrect password', async () => {
    const { getByLabelText, getByText } = render(
        <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng', state: null }]}>
        <Login />
        </MemoryRouter>
    );
    const emailInput = getByLabelText('Usuario');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('Iniciar sesión');
    global.fetch = jest.fn().mockResolvedValue({
        status: 404,
        json: () => Promise.resolve({ detail: 'Incorrect password!' }),
      });
    fireEvent.change(emailInput, { target: { value: 'example@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = getByText('Incorrect password!');
      expect(errorMessage).toBeInTheDocument();
    });

  });

  it('navegación después de una respuesta exitosa', async () => {
    const mockUser = { username: 'example@gmail.com', id: 1 };
    const mockFetch = jest.fn().mockResolvedValue({
      status: 200,
      json: jest.fn().mockResolvedValue({ user: mockUser })
    });
    global.fetch = mockFetch;
  
    const { getByLabelText, getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/', search: '?value=teresa_teng', state: null }]}>
        <Login />
      </MemoryRouter>
    );
  
    fireEvent.change(getByLabelText('Usuario'), { target: { value: 'usuario1' } });
    fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'password1' } });
    fireEvent.click(getByText('Iniciar sesión'));
  
    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
  
    expect(mockFetch).toHaveBeenCalledWith('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'usuario1',
        password: 'password1'
      })
    });
  });

});

