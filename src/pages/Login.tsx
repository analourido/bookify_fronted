import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            setMessage('Inicio de sesión exitoso');
            navigate("/books");
        } catch (error) {
            const msg = error instanceof Error ? error.message : 'Error desconocido';
            setMessage(msg);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-primary">¡Inicia Sesión Ahora!</h1>
                    <p className="py-6 text-primary-70">
                        Accede a tu cuenta y descubre nuevas lecturas. Conéctate con otros lectores y disfruta de Bookify.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset">
                                <label className="label" htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="nombre@ejemplo.com"
                                    className="input input-bordered w-full"
                                    required
                                />

                                <label className="label mt-4" htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Tu contraseña"
                                    className="input input-bordered w-full"
                                    required
                                />

                                <div className="mt-2">
                                    <a className="link link-hover text-primary-70">¿Olvidaste tu contraseña?</a>
                                </div>

                                <button type="submit" className="btn btn-primary mt-4 w-full">
                                    Iniciar Sesión
                                </button>

                                {message && (
                                    <div className="mt-4 text-center text-error">
                                        {message}
                                    </div>
                                )}
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
