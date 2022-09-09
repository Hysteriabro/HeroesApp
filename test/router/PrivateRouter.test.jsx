import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRouter } from "../../src/router/PrivateRouter";

describe('Pruebas en <PrivateRouter />', () => {

    test('debe de mostrar el children si esta autenticado', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                name: 'Simon',
                id: '123'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue } >
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRouter>
                        <h1>Ruta privada</h1>
                    </PrivateRouter>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');
    });

    // test('', () => {

    // });
})
