import React, { ChangeEvent, FormEvent, useState } from "react";
import { AuthService } from "../services/auth.services";
import User from "../models/User";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ErrorMsgData from "../utils/ErrorMsgData";
import InputForm from "../components/InputForm";

const Register: React.FC = () => {
  const [form, setForm] = useState<Partial<User>>({
    name: "",
    surname: "",
    email: "",
    password: "",
    acceptNotifications: false,
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    try {
      setLoading(true);
      setErrors({});
      e.preventDefault();
      await AuthService.registerUser(form);
      toast.success("Usuario registrado con éxito!");
      navigate("/books");
    } catch (error) {
      toast.error("Error al registrar el usuario.");
      if (Array.isArray(error)) {
        const errorObj: Record<string, string> = error.reduce((acc: Record<string, string>, err: unknown) => {
          const errorDetail = err as ErrorMsgData;
          acc[errorDetail.path] = errorDetail.msg;
          return acc;
        }, {});
        setErrors(errorObj);
      } else if (error instanceof Error) {
        setErrors({ message: error.message || "Error desconocido" });
      } else {
        setErrors({ message: String(error) || "Error desconocido" });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = e.target;
    setForm({ ...form, [name]: checked });
  };

  if (loading) return <p className="text-center text-primary mt-4">Loading...</p>;

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-primary-90">¡Únete a Bookify!</h1>
          <p className="py-6 text-primary-85">
            Explora libros, crea clubs de lectura y comparte tus historias favoritas.
          </p>
          <p className="text-primary-70">
            Regístrate ahora para empezar a descubrir y compartir historias inolvidables.
          </p>
        </div>

        {/* Formulario a la derecha */}
        <div className="card bg-base-100 shadow-xl w-full max-w-md">
          <form onSubmit={handleSubmit} className="card-body">
            <h2 className="text-2xl font-bold text-center text-primary-90 mb-4">Regístrate</h2>

            <InputForm
              text="Nombre"
              name="name"
              value={form.name || ''}
              handleChange={handleChange}
              error={errors.name}
            />

            <InputForm
              text="Apellidos"
              name="surname"
              value={form.surname || ''}
              handleChange={handleChange}
              error={errors.surname}
            />

            <InputForm
              text="Email"
              name="email"
              value={form.email || ''}
              handleChange={handleChange}
              error={errors.email}
            />

            <InputForm
              text="Password"
              name="password"
              type="password"
              value={form.password || ''}
              handleChange={handleChange}
              error={errors.password}
            />

            {/* Checkbox */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptNotifications"
                  checked={form.acceptNotifications || false}
                  onChange={handleChangeCheckbox}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text ml-2 text-primary-85">
                  ¿Aceptas recibir notificaciones?
                </span>
              </label>
              {errors.acceptNotifications && (
                <p className="text-sm text-red-500">{errors.acceptNotifications}</p>
              )}
            </div>

            {/* Error general */}
            {errors.message && (
              <p className="text-center text-red-500 mt-2">{errors.message}</p>
            )}

            {/* Botón */}
            <button
              type="submit"
              className="btn btn-primary mt-4 w-full"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
