import { ChangeEvent, FormEvent, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState(
        {
            email: '',
            password: ''
        }
    )
    const [message, setMessage] = useState('')
    const { login } = useAuth()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // mensaje por post al api del backend
        try {
            //await AuthService.loginUser(form.email, form.password) // backend
            await login(form.email, form.password) // llamada al contexto
            setMessage('login successfull')
            navigate("/books");
            // Redirigir a otra pagina (ofertas)
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error desconocido'
            setMessage(msg)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setForm({ ...form, [name]: value, })
    }

    return (
        <div className=" flex items-center justify-center p-4 bg-[url('img/fondos/fondo.png')] bg-cover bg-center">
            <form className="w-full max-w-md bg-[rgba(43,54,114,0.13)] rounded-lg shadow-md p-8" onSubmit={handleSubmit}>
                <h2 className="text-3xl font-extrabold text-primary-90 mb-6 text-center">
                    Iniciar Sesión
                </h2>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-primary-70">
                        Tu correo electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        id="email"
                        className="bg-[rgba(43,54,114,0.13)] border border-primary-65 text-primary-85 text-sm rounded-lg focus:ring-primary-85 focus:border-primary-85 block w-full p-2.5 transition-all duration-300 ease-in-out"
                        placeholder="nombre@ejemplo.com"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-primary-70">
                        Tu contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        id="password"
                        className="bg-[rgba(43,54,114,0.13)] border border-primary-65 text-primary-85 text-sm rounded-lg focus:ring-primary-85 focus:border-primary-85 block w-full p-2.5 transition-all duration-300 ease-in-out"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="text-white bg-primary-85 hover:bg-primary-90 focus:ring-4 focus:outline-none focus:ring-primary-70 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-all duration-300 ease-in-out shadow-md"
                >
                    Iniciar Sesión
                </button>
                {message && <div className="mt-4 text-center text-red-500">{message}</div>}
            </form>
        </div>
    );
}

export default Login;