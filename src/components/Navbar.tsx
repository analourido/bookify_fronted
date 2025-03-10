import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Collapse } from 'flowbite';
import { useRef } from 'react';

function Navbar() {
    const { user, isAdmin, isAuthenticated, logout } = useAuth()
    const menuHamburguesa = useRef(null)
    const menuHamburguesaTriger = useRef(null)
    const userLogured = () => {
        if (!user) return ''
        if (isAuthenticated && user?.role === 'admin') return 'Eres admin'
        if (isAuthenticated) return 'Eres user'
    }

    const handleCollapse = () => {
        const collapse = new Collapse(menuHamburguesa.current, menuHamburguesaTriger.current);
        collapse.toggle();
        console.log('click')
    }

    return (
        <nav className="bg-[rgba(43,54,114,0.79)]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="img\logos\logo_naranja.png" className="h-8" alt="EmpleateTu Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white drop-shadow-md">
                        Bookify
                    </span>
                </Link>

                {/* Botones y menú  */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {!isAuthenticated && (
                        <Link
                            to="/login"
                            className="text-white bg-primary-85 hover:bg-primary-90 focus:ring-4 focus:outline-none focus:ring-primary-60 font-medium rounded-lg text-sm px-4 py-2 text-center transition-all duration-300 ease-in-out drop-shadow-md"
                        >
                            Iniciar Sesión
                        </Link>
                    )}
                    {isAuthenticated && (
                        <button
                            className="text-white hover:text-primary-90 font-medium drop-shadow-md"
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </button>
                    )}
                    <button
                        ref={menuHamburguesaTriger}
                        onClick={handleCollapse}
                        className="md:hidden text-white hover:text-primary-90"
                    >
                        <span className="sr-only">Abrir menú principal</span>
                        <svg
                            className="w-6 h-6"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                </div>

                {/* Menú principal */}
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar"
                >
                    <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 md:font-medium">
                        <li>
                            <Link
                                to="/"
                                className="block py-2 px-3 text-white hover:text-primary-90 rounded-lg transition-all duration-300 ease-in-out drop-shadow-md"
                            >
                                Inicio
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <li>
                                <Link
                                    to="/register"
                                    className="block py-2 px-3 text-white hover:text-primary-90 rounded-lg transition-all duration-300 ease-in-out drop-shadow-md"
                                >
                                    Registro
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <>
                                <li>
                                    <Link
                                        to="/profile"
                                        className="block py-2 px-3 text-white hover:text-primary-90 rounded-lg transition-all duration-300 ease-in-out drop-shadow-md"
                                    >
                                        Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/books"
                                        className="block py-2 px-3 text-white hover:text-primary-90 rounded-lg transition-all duration-300 ease-in-out drop-shadow-md"
                                    >
                                        Libros
                                    </Link>
                                </li>
                            </>
                        )}
                        {isAdmin && (
                            <>
                                <li>
                                    <Link
                                        to="/userList"
                                        className="block py-2 px-3 text-white hover:text-primary-90 rounded-lg transition-all duration-300 ease-in-out drop-shadow-md"
                                    >
                                        Usuarios
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/categories"
                                        className="block py-2 px-3 text-white hover:text-primary-90 rounded-lg transition-all duration-300 ease-in-out drop-shadow-md"
                                    >
                                        Categorías
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Información del usuario */}
            {user?.email && (

                <div className="text-orange-300 text-sm text-center md:text-right px-4 py-2 drop-shadow-md">
                    {user.email} {userLogured()}
                </div>
            )}
        </nav>


    )
}

export default Navbar