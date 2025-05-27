import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react';

function Navbar() {
    const { user, isAdmin, isAuthenticated, logout } = useAuth()
    const [randomColor, setRandomColor] = useState('');
    //const menuHamburguesa = useRef(null)
    //const menuHamburguesaTriger = useRef(null)
    const userLogured = () => {
        if (!user) return ''
        if (isAuthenticated && user?.role === 'admin') return 'Eres admin'
        if (isAuthenticated) return 'Eres user'
    }



    useEffect(() => {
        // generar color aleatorio para el icono del perfil del usuario
        const randomHexColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        setRandomColor(randomHexColor);
    }, []);

    /*const handleCollapse = () => {
        const collapse = new Collapse(menuHamburguesa.current, menuHamburguesaTriger.current);
        collapse.toggle();
        console.log('click')
    }*/

    return (
        <nav className="bg-[rgba(43,54,114,0.79)] p-4">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="img\logos\logo_naranja.png" className="h-8" alt="EmpleateTu Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white drop-shadow-md">
                        Bookify
                    </span>
                </Link>
                <div className="flex items-center md:order-2 space-x-3">
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
                            className="flex items-center text-white hover:text-primary-90 font-medium drop-shadow-md"
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </button>
                    )}

                    {/* Información del Usuario */}
                    {user?.email && (
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            {/* Icono de Usuario */}
                            <div
                                className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full"
                                style={{ backgroundColor: randomColor }}
                            >
                                <span className="font-medium text-gray-600 dark:text-gray-900">
                                    {user.email[0].toUpperCase()}
                                </span>
                            </div>
                            {/* Texto de Usuario */}
                            <div className="text-white dark:text-gray-200">
                                {userLogured()}
                            </div>
                        </div>
                    )}
                </div>
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
                                <li>
                                    <Link
                                        to="/clubs"
                                        className="block py-2 px-3 text-white hover:text-primary-90 rounded-lg transition-all duration-300 ease-in-out drop-shadow-md"
                                    >
                                        Clubs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/suggestions"
                                        className="block py-2 px-3 text-white hover:text-primary-90 rounded-lg transition-all duration-300 ease-in-out drop-shadow-md"
                                    >
                                        Sugerencias
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



        </nav>


    )
}

export default Navbar